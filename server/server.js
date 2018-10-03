
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

socket.emit('newMEssageEvent',{
  from:'Admin',
  text:'Welcome to chat app',
  createdAt: new Date().getTime()
});

socket.broadcast.emit('newMEssageEvent',{
  from:'Admin',
  text:'New user Joined',
  createdAt:new Date().getTime()
});

socket.on('createMessageEvent',(msg)=>{
  console.log('Msg :',msg);
  io.emit('newMEssageEvent',{
    from:msg.from,
    text:msg.text,
    createdAt:new Date().getTime()
  });
});







socket.on('disconnect',()=>{
  console.log('User was disconnected');
});

});



server.listen(port,()=>{
  console.log(`server is up and running in ${port}`);
});
