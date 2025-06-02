
const socket = require("../app")

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

module.exports ={ 
  connectUsers,
  test,
};