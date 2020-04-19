const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const router = require('./router');
const db = require('./db');
const DB = new db();
const path = require('path');
let server = require('http').Server(app);
let io = require('socket.io')(server);

const publicPath = path.join(__dirname, '../public/');
app.use(express.static(publicPath));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);

//Socket

let users = {};

io.on('connection', socket => {

  console.log(Object.keys(io.sockets.connected).length);

  socket.emit('connections', Object.keys(io.sockets.connected).length);

  socket.on('chatMessage', data => {

    let user = users[data.receiver];
 
    io.to(user).emit('chatMessage', data);

    console.log('New message:', data);
  });

  socket.on('joined', data => {

    users[data] = socket.id;

    console.log('Joined in chat:', data);
    
    io.emit('joined', data);
  });

  socket.on('leave', data => {
    console.log('Leave', data);
    io.sockets.emit('leave', data);
  });
});

server.listen(3001, () => {
  DB.connect();
  console.log('We are live on ' + 3001);
});
