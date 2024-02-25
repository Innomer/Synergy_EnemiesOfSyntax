const express = require('express');
const { singleFileUpload, multipleFileUpload, commitRollback, fileRollback, getCommitHistoryForFile, getCommitHistoryForProject } = require('../controllers/fileUploadController');
const { upload } = require('../middlewares/multer');
const router = express.Router();
const fileStructureController = require('../controllers/fileStructureController');
const { FileModel } = require('../models/fileModel');
const fs = require('fs').promises;
const readline = require('readline');
const diff = require('diff');
const path=require('path');
const axios = require('axios');

router.post('/uploadSingle', upload.single('file'), singleFileUpload);
router.post('/uploadMultiple', upload.array('files', parseInt(process.env.MULTIFILECOUNT)), multipleFileUpload);
router.get('/fs/:projectName', async (req, res) => {
    try {
        const { projectName } = req.params;
        const fileStructure = await fileStructureController.getFileStructureByProject(projectName);
        res.json(fileStructure);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/fs', async (req, res) => {
    try {
        const allProjectsFileStructure = await fileStructureController.getAllProjectsFileStructure();
        res.json(allProjectsFileStructure);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/projects', fileStructureController.getAllProjects);

router.post('/rollback/:fileName/:versionId', fileRollback);

router.post('/revert-to-commit/:commitId', async (req, res) => {
    try {
        const { commitId } = req.params;
        const result = await commitRollback(commitId);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint for single file commit history
router.get('/commit-history/file/:projectName/:filename', async (req, res) => {
    try {
        const { projectName, filename } = req.params;
        const commitHistory = await getCommitHistoryForFile(projectName, filename);
        res.json(commitHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint for project commit history
router.get('/commit-history/project/:projectName', async (req, res) => {
    try {
        const { projectName } = req.params;
        const commitHistory = await getCommitHistoryForProject(projectName);
        res.json(commitHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete/:projectName/:fileName', async (req, res) => {
    try {
        const { projectName, fileName } = req.params;

        // Find the file in the database
        const file = await FileModel.findOne({ project: projectName, filename: fileName });

        if (!file) {
            return res.status(404).json({ error: 'File not found.' });
        }

        // Remove the file from the static folder
        await fs.access(file.path)
        await fs.unlink(file.path);

        // Optionally, you can move the file to a trash or archive folder instead of deleting it completely
        // const archiveFolder = path.join('archive', project);
        // await fs.mkdir(archiveFolder, { recursive: true });
        // await fs.rename(file.path, path.join(archiveFolder, file.filename));

        // Create a new entry in the database with a null filepath to represent the deleted file
        const deletedFile = new FileModel({
            originalname: file.originalname,
            filename: file.filename,
            project: file.project,
            commitMessage: 'Deleted', // You can customize this message
            timestamp: Date.now(),
            hash: null,
            tag: null,
            version: null,
            path: null, // Null filepath to indicate deletion
        });

        await deletedFile.save();

        res.json({ message: 'File deleted from static folder.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/compare-files', (req, res) => {
    const { oldFilePath, newFilePath, outputFilePath } = req.body;

    if (!oldFilePath || !newFilePath || !outputFilePath) {
        return res.status(400).json({ error: 'Please provide oldFilePath, newFilePath, and outputFilePath in the request body.' });
    }

    compareFiles(oldFilePath, newFilePath, outputFilePath)
        .then(() => {
            res.json({ message: 'Comparison completed.', path: outputFilePath });
        })
        .catch((error) => {
            console.error('Error comparing files:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

function compareFiles(oldFilePath, newFilePath, outputFilePath) {
    return new Promise((resolve, reject) => {
        const oldFileLines = [];
        const newFileLines = [];

        const oldFileReadStream = readline.createInterface({
            input: fs.createReadStream(oldFilePath),
            crlfDelay: Infinity,
        });

        const newFileReadStream = readline.createInterface({
            input: fs.createReadStream(newFilePath),
            crlfDelay: Infinity,
        });

        oldFileReadStream.on('line', (line) => {
            oldFileLines.push(line);
        });

        newFileReadStream.on('line', (line) => {
            newFileLines.push(line);
        });

        Promise.all([once(oldFileReadStream, 'close'), once(newFileReadStream, 'close')])
            .then(() => {
                const changes = getLineChanges(oldFileLines, newFileLines);

                fs.writeFileSync(outputFilePath, changes.join('\n'), 'utf-8');

                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function getLineChanges(oldLines, newLines) {
    const changes = [];

    const lineDiff = diff.diffLines(oldLines.join('\n'), newLines.join('\n'));

    lineDiff.forEach((part) => {
        if (part.added || part.removed) {
            const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
            changes.push(`${prefix}${part.value}`);
        }
    });

    return changes;
}

function once(emitter, event) {
    return new Promise((resolve) => {
        emitter.once(event, resolve);
    });
}

router.post('/compare-versions', async (req, res, next) => {
    const { fileName, commitId } = req.body;

    if (!fileName || !commitId) {
        return res.status(400).json({ error: 'Please provide fileName and commitId in the request body.' });
    }

    try {
        const { currentVersion, commitIdVersion } = await getFilePathsForComparison(fileName, commitId);

        // Assuming there is an API endpoint for file comparison
        const comparisonApiUrl = `${process.env.COMPARISON_API_URL}/compare_images`;

        // Sending a POST request to the comparison API
        const comparisonResult = await axios.post(comparisonApiUrl, {
            old_dwg:currentVersion,
            mod_dwg:commitIdVersion,
        });

        res.json({ message: 'Comparison completed.', result: comparisonResult.data });
    } catch (error) {
        console.error('Error comparing versions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getFilePathsForComparison(fileName, commitId) {
    try {
        // Find the current version of the file
        const currentVersionFile = await FileModel.findOne({ filename: fileName }, {}, { sort: { timestamp: -1 } });

        if (!currentVersionFile) {
            throw new Error('File not found.');
        }

        // Find the file version based on commitId
        const commitIdVersionFile = await FileModel.findOne({ filename: fileName, commitId });

        if (!commitIdVersionFile) {
            throw new Error('File version for commitId not found.');
        }

        // Construct the file paths
        // const currentVersion = path.join(process.env.IP, 'download', encodeURIComponent(currentVersionFile.path));
        // const commitIdVersion = path.join(process.env.IP, 'download', encodeURIComponent(commitIdVersionFile.path));
        const currentVersion = currentVersionFile.path;
        const commitIdVersion = commitIdVersionFile.version;

        return { currentVersion, commitIdVersion };
    } catch (error) {
        throw error;
    }
}


module.exports = router;