const { FileModel } = require('../models/fileModel');
const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');

const singleFileUpload = async (req, res, next) => {
    try {
        const { project, commitMessage } = req.body;

        // Ensure req.body.project is not null or undefined
        if (!project) {
            return res.status(400).json({ error: 'Project Name is required.' });
        }

        if (!commitMessage) {
            commitMessage = new Date().toISOString();
        }

        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const fileData = {
            originalname: file.originalname,
            filename: file.filename,
            path: file.path,
            project,
        };

        // Calculate hash of the new file
        const newFileHash = await calculateFileHash(file.path);

        // Get the latest version from the database
        const latestVersion = await FileModel.findOne({ filename: fileData.filename, project }, {}, { sort: { timestamp: -1 } });

        if (!latestVersion || latestVersion.hash !== newFileHash) {
            // Save a new version and update the database if there are changes
            const versionedFolder = path.join('versions', project);
            const versionedFilePath = path.join(versionedFolder, `${fileData.filename}_${Date.now()}`);

            // Ensure the destination folder exists before copying
            await fs.mkdir(versionedFolder, { recursive: true });

            await fs.copyFile(fileData.path, versionedFilePath);

            // Store version metadata in MongoDB
            await FileModel.create({
                ...fileData,
                version: versionedFilePath,
                commitMessage,
                timestamp: Date.now(),
                hash: newFileHash,
                commitId: Date.now().toString(), // Unique commit ID
            });
        }

        res.send('File uploaded and versioned!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const commitRollback = async function(commitId) {
    try {
        const filesToRevert = await FileModel.find({ commitId });

        await Promise.all(filesToRevert.map(async file => {
            const versionPath = path.join('versions', file.project, file.filename);

            // Ensure the version exists before reverting
            try {
                await fs.access(versionPath);
            } catch (error) {
                console.error(`Version not found for file: ${file.filename}`);
                return;
            }

            // Remove the current file
            await fs.unlink(file.path);

            // Restore the specified version
            await fs.copyFile(versionPath, file.path);
        }));

        return { message: 'Revert to commit successful.' };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to revert to commit.');
    }
}

const fileRollback = async (req, res, next) => {
    try {
        const { fileName, versionId } = req.params;

        const file = await FileModel.findOne({ filename: fileName }, {}, { sort: { timestamp: -1 } });

        if (!file) {
            return res.status(404).json({ error: 'File not found.' });
        }
        await fs.access(file.version)
        await fs.unlink(file.version)

        const versionPath = path.join('versions', file.project, file.filename+"_"+versionId);

        // Ensure the version exists before rolling back
        try {
            await fs.access(versionPath);
        } catch (error) {
            return res.status(404).json({ error: 'Version not found.' });
        }

        // Remove the current file
        await fs.unlink(file.path);

        // Restore the specified version
        await fs.copyFile(versionPath, file.path);

        res.json({ message: 'Rollback successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const multipleFileUpload = async (req, res, next) => {
    try {
        const files = req.files;
        const { project, commitMessage } = req.body;
        const filesNotUpdated = [];
        // Ensure req.body.project is not null or undefined
        if (!project) {
            return res.status(400).json({ error: 'Project Name is required.' });
        }
        if (!commitMessage) {
            commitMessage = new Date().toISOString();
        }
        await Promise.all(req.files.map(async file => {
            const fileData = {
                originalname: file.originalname,
                filename: file.filename,
                path: file.path,
                project,
            };

            // Calculate hash of the new file
            const newFileHash = await calculateFileHash(file.path);

            // Get the latest version from the database
            const latestVersion = await FileModel.findOne({ filename: fileData.filename, project }, {}, { sort: { timestamp: -1 } });

            if (!latestVersion || latestVersion.hash !== newFileHash) {
                // Save a new version and update the database if there are changes
                const versionedFolder = path.join('versions', project);
                const versionedFilePath = path.join(versionedFolder, `${fileData.filename}_${Date.now()}`);

                // Ensure the destination folder exists before copying
                await fs.mkdir(versionedFolder, { recursive: true });

                await fs.copyFile(fileData.path, versionedFilePath);

                // Store version metadata in MongoDB
                await FileModel.create({
                    ...fileData,
                    version: versionedFilePath,
                    commitMessage,
                    timestamp: Date.now(),
                    hash: newFileHash,
                    commitId: Date.now().toString(), // Unique commit ID
                });
            }
            else {
                console.log('File already exists');
                filesNotUpdated.push(fileData.originalname);
            }
        }));
        const message = filesNotUpdated.length > 0 ? `Files uploaded and versioned! \n Files not updated: ${filesNotUpdated}` : 'Files uploaded and versioned!';
        res.json({ message, filesNotUpdated });
        // res.json("message":{`Files uploaded and versioned! \n Files not updated: ${filesNotUpdated}`});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to calculate the hash of a file
async function calculateFileHash(filePath) {
    const hash = crypto.createHash('sha256');
    const fileContent = await fs.readFile(filePath);
    hash.update(fileContent);
    return hash.digest('hex');
}

module.exports = { singleFileUpload, multipleFileUpload, commitRollback, fileRollback};