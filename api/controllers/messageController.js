
const socket = require("../app")
const queries = require("../database/db");

async function connectUsers(req,res){
console.log("test");
//   socket.io.on('connection',(sock)=>{
//     console.log("test2");
//   sock.on('submission',(msg)=>{
//     console.log("test3");
//     console.log('message: ' + msg);
//     socket.io.emit('responses',msg);
//   })
//  })


 res.send({
    message:"Connected",
 })
}

async function test(req,res){
  res.send({
    message:"test worked",
  })
}
async function directMessage(req,res){
  console.log(req.body);
  const message ={
    message:req.body.message,
    senderId:req.body.senderId,
    receiverId:req.body.receiverId,
  }
  const createdMessage = queries.createMessage(message);
  if(createdMessage){
    res.status(201).json({
      message:"Message saved"
    });
  }
  else{
    res.status(500).json({
      message:"Message was not created and/or saved properly"
    });
  }
}

module.exports ={ 
  connectUsers,
  test,
  directMessage,
};