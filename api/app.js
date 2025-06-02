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

io.on('connection', (socket)=>{
  console.log("A user is trying to connect");
  socket.on('authentication', async (token)=>{
    let tokenArray = token.token.split('.');
    let user = JSON.parse(atob(tokenArray[1])).user;
    let found = await query.userVerify(user);
    console.log(found);
    if(found){
      console.log("test");
      io.emit('responses',`User ${found.username} has connected!`)
    }
    else{
      io.disconnect(true);
    }
  })
});



server.listen(3000, () => {
    console.log(`Listening to port 3000`); 
  });


  module.exports.io= io;