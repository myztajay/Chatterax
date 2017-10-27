/*jshint esversion: 6 */
/*jslint node: true */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

//enivronmental variables
server.listen(process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

