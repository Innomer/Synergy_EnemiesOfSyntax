const express = require('express');
const { singleFileUpload, multipleFileUpload } = require('../controllers/fileUploadController');
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


module.exports = router;