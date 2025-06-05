module.exports = function(io){
  io.on('connection', (socket) => {
    console.log(`User ${socket.user.username} connected`);
    io.emit('responses', `User ${socket.user.username} has connected!`);
    let users = [];
    for (let [id,sock] of io.of("/").sockets){
      users.push({
        userID:id,
        userName:sock.user.username
      });
    }
  io.emit("users",users);
  socket.on('submission',(msg)=>{
    console.log(msg);
    socket.broadcast.emit('responses',msg);
  });

  socket.on('disconnect',()=>{
    console.log(`User ${socket.user.username} disconnected`);
    io.emit('responses',`User ${socket.user.username} disconnected`);
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