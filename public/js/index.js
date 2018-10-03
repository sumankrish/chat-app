var socket = io();

socket.on('connect', function(){
  console.log('Connected to server');

  socket.emit('createEmail',{
    to:'rupa@love.com',
    text:'dear wife'
  });

socket.emit('createMessageEvent',{
  from:'rupa',
  text:'Love you too dear'
});

});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

socket.on('newEmail',function(email){
  console.log('New Email :',email);
});

socket.on('newMEssageEvent',function(msg){
  console.log('msg :',msg);
})
