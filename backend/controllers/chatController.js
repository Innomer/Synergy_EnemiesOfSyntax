
var users = {}
const axios=require('axios');
const fs=require('fs');

function getUsers(arr) {
    onlineUsers = []
    arr.forEach((onlineUser) => {
        onlineUsers.push(Object.values(onlineUser)[0])
    })
    return onlineUsers
}

function socket(io) {
    io.on('connection', (socket) => {
        socket.on('joined-user', (data) => {
            var user = {};
            user[socket.id] = data.username;
            if (users[data.roomname]) {
                users[data.roomname].push(user);
            }
            else {
                users[data.roomname] = [user];
            }
            socket.join(data.roomname);

            io.to(data.roomname).emit('joined-user', { username: data.username });

            io.to(data.roomname).emit('online-users', getUsers(users[data.roomname]))
        })

        socket.on('chat', (data) => {
            io.to(data.roomname).emit('chat', { username: data.username, message: data.message });
        })

        socket.on('typing', (data) => {
            socket.broadcast.to(data.roomname).emit('typing', data.username)
        })

        socket.on('disconnecting', () => {
            var rooms = Object.keys(socket.rooms);
            var socketId = rooms[0];
            var roomname = rooms[1];
            users[roomname].forEach((user, index) => {
                if (user[socketId]) {
                    users[roomname].splice(index, 1)
                }
            });
            io.to(roomname).emit('online-users', getUsers(users[roomname]))
        })
    })
}
function roomRedirect(req, res) {
    roomname = req.body.roomname;
    username = req.body.username;
    res.redirect(`${req.headers.hostname}/room?username=${username}&roomname=${roomname}`);
}

const apiKey = process.env.GAPI;

const keywordsToSearch = ["Architectural", "Electrical", "Reports", "Quotations"];

async function performOCRAndClassify(apiKey, imagePath, keywords) {
    try {
        const ocrResponse = await axios.post('https://api.geminisolution.ai/v1/ocr', {
            image: fs.readFileSync(imagePath).toString('base64'),
            language: 'eng',
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': apiKey,
            },
        });

        const ocrText = ocrResponse.data.text;
        console.log('OCR Text:', ocrText);

        const foundKeywords = keywords.filter(keyword => ocrText.toLowerCase().includes(keyword.toLowerCase()));

        if (foundKeywords.length > 0) {
            console.log('Document belongs to the following class(es):', foundKeywords.join(', '));
        } else {
            console.log('Document does not match any predefined class.');
        }

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

// performOCRAndClassify(apiKey, imagePath, keywordsToSearch);
module.exports = { socket, roomRedirect };