/*jshint esversion: 6 */
/*jslint node: true */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io').listen(server);

//enivronmental variables
server.listen(process.env.PORT || 3000);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/index.html');
  console.log(__dirname);
});


io.sockets.on('connection', (socket)=>{
  console.log('connected to socket');

  socket.on('send message', (data)=>{
    io.sockets.emit('new message', {msg: data});
  });  
});