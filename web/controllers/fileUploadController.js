const { FileModel } = require('../models/fileModel');

const singleFileUpload = async (req, res, next) => {
    try {
        const { project } = req.body;
        const file=req.file;
        const { originalname, filename, path } = req.file;
        await FileModel.create({ originalname, filename, path, project });
        if (!file || file === undefined) {
            const error = new Error('Please upload a file');
            error.httpStatusCode = 400;
            return next(error)
        }
        res.send(file);
    } catch (error) {
        next(error);
        console.log(error);
        res.status(500);
    }
}

const multipleFileUpload = async (req, res, next) => {
    try {
        const { project } = req.body;
        const files = req.files;
        const filesData = req.files.map(file => ({
            originalname: file.originalname,
            filename: file.filename,
            path: file.path,
            project,
        }));

        await FileModel.create(filesData);
        if (!files || files === undefined) {
            const error = new Error('Please upload a file');
            error.httpStatusCode = 400;
            return next(error)
        }
        res.send(files);
    }
    catch (error) {
        next(error);
        res.status(500);
    }
}

module.exports = { singleFileUpload, multipleFileUpload };