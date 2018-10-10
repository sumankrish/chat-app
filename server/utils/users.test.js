const expect = require('expect');
const {Users}=require('./user');

describe('User',()=>{
  it('should add new user',()=>{
    var users=new Users();
    var user={
      id:'123',
      name:'suman',
      room:'Love'
    };
    var resUser=users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  })
})
