const express = require('express');
const { singleFileUpload, multipleFileUpload, commitRollback, fileRollback, getCommitHistoryForFile, getCommitHistoryForProject } = require('../controllers/fileUploadController');
const { upload } = require('../middlewares/multer');
const router = express.Router();
const fileStructureController = require('../controllers/fileStructureController');
const {FileModel} = require('../models/fileModel');
const fs=require('fs').promises;


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


module.exports = router;