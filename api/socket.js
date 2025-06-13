module.exports = function(io){
  io.on('connection', (socket) => {
    console.log(`User ${socket.user.username} connected`);

    let users = [];
    for (let [id,sock] of io.of("/").sockets){
      users.push({
        userID:sock.user.id,
        userName:sock.user.username,
        socketId:id,
      });
    }

    io.emit("users",users);

    socket.on('submission',(msg)=>{
      console.log(msg);
      io.emit('responses',{msg:msg, username:socket.user.username});
    });

    socket.on('privateMessage',async(msg,id)=>{

    socket.to(id).to(socket.id).emit("privateMessage",{
      msg,
      from:socket.id,
      userName: socket.user.username,
     });
    })

    socket.on('disconnect',()=>{
      console.log(`User ${socket.user.username} disconnected`);
      users = [];
      for (let [id,sock] of io.of("/").sockets){
        users.push({
          userID:id,
          userName:sock.user.username
        });
      }
      io.emit("users",users);
    });

  });
}