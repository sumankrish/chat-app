
//https://salty-earth-67945.herokuapp.com

const path=require('path');

const express=require('express');

const socketIO=require('socket.io');

const http = require('http');

const publicPath=path.join(__dirname,'../public');

const port=process.env.PORT || 8080

var app=express();

var server=http.createServer(app);

var io = socketIO(server);

var {generatedMessage,generatedLocationMessage}=require('./utils/message.js');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{

console.log('New User Connected');

// socket.emit('newEmail',{
//   from:'suman@love.com',
//   text:'love you dear',
//   createdAt:'feelinglove'
// });
//
// socket.on('createEmail',(newEmail)=>{
//   console.log('createdAt:',newEmail);
// });

// socket.emit('newMEssageEvent',{
//   from:'sumankumar',
//   text:'Love you dear',
//   createdAt:143
// });

socket.emit('newMEssageEvent',generatedMessage('Admin','Welcome to Chat App'));


socket.broadcast.emit('newMEssageEvent',generatedMessage('Admin','New user logged in'));

socket.on('createMessageEvent',(msg,callback)=>{
  console.log('Msg :',msg);
  io.emit('newMEssageEvent',generatedMessage(msg.from,msg.text));
  callback();
});


socket.on('createLocationMessage',(coords)=>{
io.emit('newLocationMessage',generatedLocationMessage('Admin',coords.latitude,coords.longitude));

});


socket.on('disconnect',()=>{
  console.log('User was disconnected');
});

});



server.listen(port,()=>{
  console.log(`server is up and running in ${port}`);
});
