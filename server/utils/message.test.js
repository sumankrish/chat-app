const expect=require('expect');

var{generatedMessage}=require('./message');

describe('generatedMessage',()=>{

it('should return correct message',()=>{

var from='sumankumar';
var text='Going to win';
var message=generatedMessage(from,text);

expect(typeof message.createdAt).toBe('number');
//expect(message).toContain({from,text});

});

});
