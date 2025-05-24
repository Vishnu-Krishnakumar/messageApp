const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const loginRoutes = require("./routes/loginRoute");
// const auth = require("./auth/auth");

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", loginRoutes );

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

server.listen(3000, () => {
    console.log(`Listening to port 3000`); 
  });
