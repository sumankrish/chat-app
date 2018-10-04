const expect=require('expect');

var{generatedMessage,generatedLocationMessage}=require('./message');

describe('generatedMessage',()=>{

it('should return correct message',()=>{

var from='sumankumar';
var text='Going to win';
var message=generatedMessage(from,text);

expect(typeof message.createdAt).toBe('number');
//expect(message).toContain({from,text});

});

});

describe('generatedLocationMessage',()=>{
it('should return Current location',()=>{
  var from='suman';
  var latitude=20;
  var longitude=3;
  var url='https://www.google.com/maps?q=20,30';

  var message=generatedLocationMessage(from,latitude,longitude);

  expect(typeof message.createdAt).toBe('number');
});

});
