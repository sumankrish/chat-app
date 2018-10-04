var socket = io();

socket.on('connect', function(){
  console.log('Connected to server');

//   socket.emit('createEmail',{
//     to:'rupa@love.com',
//     text:'dear wife'
//   });
//
// socket.emit('createMessageEvent',{
//   from:'rupa',
//   text:'Love you too dear'
// });

});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

// socket.on('newEmail',function(email){
//   console.log('New Email :',email);
// });

socket.on('newMEssageEvent',function(msg){
  console.log('msg :',msg);
var li=jQuery('<li></li>');
li.text(`${msg.from}: ${msg.text}`);

jQuery('#messages').append(li);

})


jQuery('#message-form').on('submit',function(e){

e.preventDefault();

socket.emit('createMessageEvent',{

from:'Suman',
text:jQuery('[name=message]').val()
},function (data){
console.log(data)
});

});
