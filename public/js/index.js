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
  var formattedTime=moment(msg.createdAt).format('h:mm a');
  console.log('msg :',msg);
var li=jQuery('<li></li>');
li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

jQuery('#messages').append(li);

});

socket.on('newLocationMessage',function(message){

  var formattedTime=moment(message.createdAt).format('h:mm a');

var li=jQuery('<li></li>');
var a=jQuery('<a target="_blank">Current Location</a>');

li.text(`${message.from} ${formattedTime} : `);
a.attr('href',message.url);
li.append(a);
jQuery('#messages').append(li);

});


jQuery('#message-form').on('submit',function(e){

e.preventDefault();

var messageTextbox=jQuery('[name=message]');

socket.emit('createMessageEvent',{

from:'Suman',
text:messageTextbox.val()
},function (){
messageTextbox.val('')
});

});

var locationButton=jQuery('#send-location');

locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by browser');
  }

locationButton.attr('disabled','disabled').text('Sending...');

navigator.geolocation.getCurrentPosition(function(position){
  locationButton.removeAttr('disabled').text('Send Location');
  console.log(position);
  socket.emit('createLocationMessage',{
    latitude: position.coords.latitude,
    longitude:position.coords.longitude
  });
},function(){
  locationButton.removeAttr('disabled').text('Send Location');
  alert('unable to fetch location.');
});

});
