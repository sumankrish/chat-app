const moment=require('moment');

var generatedMessage=(from,text)=>{
  return{
    from,
    text,
    createdAt:moment().valueOf()
  };
};


var generatedLocationMessage=(from,latitude,longitude)=>{
  return{
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt:moment().valueOf()
  };
};


module.exports={generatedMessage,generatedLocationMessage};
