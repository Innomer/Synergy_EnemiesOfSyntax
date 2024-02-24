const express = require("express")
const path = require("path")
const multer = require("multer");
const fs = require("fs");
const {File} = require('../models/fileModel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const project=req.body.project || 'unknown';
        const ext = path.extname(file.originalname);
        const folder = getFolderByExtension(ext);
        const destination = path.join('static', project, folder);
        fs.mkdirSync(destination, { recursive: true });

        cb(null, destination);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

function getFolderByExtension(extension) {
    switch (extension) {
        case '.jpg':
        case '.jpeg':
        case '.png':
            return 'images';
        case '.pdf':
            return 'documents';
        case '.dwg':
        case '.dxf':
        case '.dgn':
        case '.dwf':
            return 'cad';
        case '.zip':
        case '.rar':
            return 'zips';
        default:
            return 'misc';
    }
}

// const maxSize=1*1000*1000; //1MB

var upload = multer({
    storage: storage,
    // fileFilter:function(req,file,cb){
    //     // var fileTypes=/
    //     var mimetype=fileTypes.test(file.mimetype);
    //     var extname=fileTypes.test(path.extname(file.originalname).toLowerCase());
    //     if(mimetype&&extname){
    //         return cb(null,true);
    //     }
    //     cb("Error: File Upload only supports"+fileTypes);
    // }
    // limits:{fileSize:maxSize}
})

module.exports = { upload };