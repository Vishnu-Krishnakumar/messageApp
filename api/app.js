const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const loginRoutes = require("./routes/loginRoute");
const messageRoutes = require("./routes/messageRoute");
const query = require("./database/db");
const { find } = require("./validation/validation");
// const auth = require("./auth/auth");

const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin: ["http://localhost:5173","http://localhost:3000", "http://127.0.0.1:5173"],
    credentials: true,
  }
});
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:3000", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", loginRoutes );
app.use("/",messageRoutes);

io.use(async (socket,next)=>{
  console.log("A user is trying to connect");
  try{
    let token = socket.handshake.auth.token;
    if(!token) return next(new Error("No Token provided"));
    token = token.split(".");
    let user = JSON.parse(atob(token[1])).user;
    let found = await query.userVerify(user);
    if(found){
      socket.user = found;
      return next()
    }
    else{
      return next(new Error("Auth failed"));
    }
  }catch(error){
    console.error(error);
    return next(new error("Auth Error"));
  };
})

io.on('connection', (socket) => {
  console.log(`User ${socket.user.username} connected`);
  io.emit('responses', `User ${socket.user.username} has connected!`);
  const users = [];
  for (let [id,socket] of io.of("/").sockets){
    users.push({
      userID:id,
      userName:socket.user.username
    });
  }
  io.emit("users",users);
  socket.on('submission',(msg)=>{
    console.log(msg);
    socket.broadcast.emit('responses',msg);
  })

  socket.on('disconnect',()=>{
    console.log(`User ${socket.user.username} disconnected`);
    io.emit('responses',`User ${socket.user.username} disconnected`);
    
    io.emit("users",users);
  })
});




server.listen(3000, () => {
    console.log(`Listening to port 3000`); 
  });


