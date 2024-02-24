require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const adminRoutes = require('./routes/adminRoutes');
const loginRoutes = require('./routes/loginRegRoutes');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const chatRoutes = require('./routes/chatRoutes');
const bodyParser = require('body-parser');


mongoose.set("strictQuery", true);
mongoose.connect('mongodb://0.0.0.0:27017/synergy', { useUnifiedTopology: true, useNewUrlParser: true, });
mongoose.connection.on('error', err => console.log(err));
mongoose.connection.on('connected', con => console.log("connected to DB"));
mongoose.connection.on('disconnected', con => console.log("disconnected from DB"));

// const socket = require('socket.io');
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/', loginRoutes);
app.use('/', async (req, res, next) => {
    res.send("Welcome to Synergy");
});
app.use('/admin', adminRoutes);
app.use('/file', fileUploadRoutes);
app.use('/chat', chatRoutes);

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/download/:filename', (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(__dirname,filename);

    res.download(filePath, path.basename(filePath));
});
// const io=socket(app);
// require('./controllers/chatController')(io);
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(8080, () => {
    console.log('Server started at 8080');
});