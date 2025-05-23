const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');



const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) =>  {
  res.sendFile(join(__dirname, 'index.html'))}
);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
    console.log(`Listening to port 3000`); 
  });
