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
        case '.doc':
        case '.docx':
            return 'word';
        case '.pdf':
        case '.txt':
        case '.rtf':
            return 'documents';
        case '.xls':
        case '.xlsx':
        case '.csv':
            return 'excel';
        case '.dwg':
        case '.dxf':
        case '.dgn':
        case '.dwf':
            return 'cad';
        // case '.zip':
        // case '.rar':
        //     return 'zips';
        default:
            return 'misc';
    }
}

var upload = multer({
    storage: storage,
})

module.exports = { upload };