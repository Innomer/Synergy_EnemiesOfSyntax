const express=require('express');
const { singleFileUpload, multipleFileUpload } = require('../controllers/fileUploadController');
const { upload } = require('../middlewares/multer');
const router=express.Router();


router.post('/uploadSingle',upload.single('file'),singleFileUpload);
router.post('/uploadMultiple',upload.array('files',parseInt(process.env.MULTIFILECOUNT)),multipleFileUpload);

module.exports=router;