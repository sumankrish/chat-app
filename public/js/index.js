var socket = io();

function scrollToBottom(){
  var messages=jQuery('#messages');
  var newMessage=messages.children('li:last-child');
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  console.log('Connected to server');
});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

socket.on('newMEssageEvent',function(msg){
  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:msg.text,
    from:msg.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage',function(message){

  var formattedTime=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#location-message-template').html();
  var html=Mustache.render(template,{
    from:message.from,
    createdAt:formattedTime,
    url:message.url
  });

  jQuery('#messages').append(html);
  scrollToBottom();
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
