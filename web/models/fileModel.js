const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalname: String,
  filename: String,
  path: String,
  project: String,
  timestamp: { type: Date, default: Date.now },
});

const FileModel= mongoose.model('File', fileSchema);

module.exports = {FileModel}