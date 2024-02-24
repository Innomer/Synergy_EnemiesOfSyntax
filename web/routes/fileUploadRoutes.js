const express = require('express');
const { singleFileUpload, multipleFileUpload, commitRollback, fileRollback, getCommitHistoryForFile, getCommitHistoryForProject } = require('../controllers/fileUploadController');
const { upload } = require('../middlewares/multer');
const router = express.Router();
const fileStructureController = require('../controllers/fileStructureController');


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

module.exports = router;