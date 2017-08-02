const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, userTaken} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('join', (params, callback) => {
    var roomUpdate = params.room.toLowerCase().trim();
    var nameUpdate = params.name.trim();
    if (!isRealString(nameUpdate) || !isRealString(roomUpdate)) {
      return callback('Name and room name are required.');
    } else if (userTaken(nameUpdate, users.getUserList(roomUpdate))) {
      return callback('User taken');
    }
    console.log('userTaken', userTaken(params.name, users.getUserList(roomUpdate)));
    socket.join(roomUpdate);
    users.removeUser(socket.id);
    users.addUser(socket.id, nameUpdate, roomUpdate);
    io.to(roomUpdate).emit('updateUserList', users.getUserList(roomUpdate));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(roomUpdate).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    console.log('coords', coords);
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
