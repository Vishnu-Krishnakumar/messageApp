const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const loginRoutes = require("./routes/loginRoute");
const messageRoutes = require("./routes/messageRoute");
const query = require("./database/db");
const { find } = require("./validation/validation");
const jwt = require("jsonwebtoken");
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
    const decode = jwt.verify(token, process.env.secret);
    if(decode === undefined) return next(new Error("Invalid Token!"));
    let found = await query.userVerify(decode.user);
    if(found){
      socket.user = found;
      return next()
    }
    else{
      return next(new Error("Auth failed"));
    }
  }catch(error){
    console.error(error);
    return next(new Error("Auth Error"));
  };
})

io.use();
require("./socket")(io);




server.listen(3000, () => {
    console.log(`Listening to port 3000`); 
  });


