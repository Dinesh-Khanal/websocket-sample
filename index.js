import express from "express";
import { Server } from "socket.io";
import http from "http";

// App setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Static files
app.use(express.static("public"));
app.get((req, res) => {
  res.send("index.html");
});

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  // Handle chat event
  socket.on("chat", function (data) {
    // console.log(data);
    io.sockets.emit("chat", data);
  });

  // Handle typing event
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
