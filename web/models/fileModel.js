const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalname: String,
    filename: String,
    path: String,
    project: String,
    version: String,
    commitMessage: String,
    commitId: String,
    timestamp: { type: Date, default: Date.now },
    hash: String,
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = { FileModel }