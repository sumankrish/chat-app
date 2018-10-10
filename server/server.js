
//https://salty-earth-67945.herokuapp.com

const path=require('path');

const express=require('express');

const socketIO=require('socket.io');

const http = require('http');

const {isRealString}=require('./utils/validation');

const {Users} = require('./utils/user');

const publicPath=path.join(__dirname,'../public');

const port=process.env.PORT || 8080

var app=express();

var server=http.createServer(app);

var io = socketIO(server);

var users=new Users();

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

//socket.emit('newMEssageEvent',generatedMessage('Admin','Welcome to Chat App'));


//socket.broadcast.emit('newMEssageEvent',generatedMessage('Admin','New user logged in'));


socket.on('join',(params,callback)=>{

if(!isRealString(params.name) || !isRealString(params.room)){
return  callback('Name and Room are required');
}

socket.join(params.room);

users.removeUser(socket.id);
users.addUser(socket.id,params.name,params.room);

io.to(params.room).emit('updateUserList',users.getUserList(params.room));

socket.emit('newMEssageEvent',generatedMessage('Admin','Welcome to Chat App'));


socket.broadcast.to(params.room).emit('newMEssageEvent',generatedMessage('Admin',`${params.name} has joined`));

callback();
});

socket.on('createMessageEvent',(msg,callback)=>{

  var user = users.getUser(socket.id);

  if(user && isRealString(msg.text)){
      io.to(user.room).emit('newMEssageEvent',generatedMessage(user.name,msg.text));
  }
    callback();
});


socket.on('createLocationMessage',(coords)=>{

  var user=users.getUser(socket.id);
  if(user){
    io.to(user.room).emit('newLocationMessage',generatedLocationMessage(user.name,coords.latitude,coords.longitude));
  }
//io.emit('newLocationMessage',generatedLocationMessage('Admin',coords.latitude,coords.longitude));

});


socket.on('disconnect',()=>{
  var user=users.removeUser(socket.id);

  if(user){
    io.to(user.room).emit('updateUserList',users.getUserList(user.room));
    io.to(user.room).emit('newMEssageEvent',generatedMessage('Admin',`${user.name} has left`));
  }
});

});



server.listen(port,()=>{
  console.log(`server is up and running in ${port}`);
});
