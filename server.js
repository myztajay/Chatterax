/*jshint esversion: 6 */
/*jslint node: true */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io').listen(server);
const usernames = [];

//enivronmental variables
server.listen(process.env.PORT || 3000);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/index.html');
});


io.sockets.on('connection', (socket)=>{
  console.log('connected to socket');
  
  socket.on('new user', (data, callback)=>{
    usernames.indexOf(data) != -1 ? callback(false) : callback(true);
      socket.username = data;
      usernames.push(socket.username);
      updateUsernames(); 
  });
  
  //Update Usernames
  updateUsernames = () =>{
    io.sockets.emit('usernames', usernames);
  };
  // Send Message
  socket.on('send message', (data)=>{
    console.log('this was triggers');
    io.sockets.emit('new message', {msg: data, user: socket.username});
  });  
  
  socket.on('disconnect', (data)=>{
    if(!socket.username){
      return;
    }  
    usernames.splice(usernames.indexOf(socket.username), 1);
    updateUsernames();
  });
});

