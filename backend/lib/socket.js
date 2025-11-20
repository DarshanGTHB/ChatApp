import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);
// socket io server on top of express server

const io = new Server(server, {
  cors: {
    origin: "https://chatapp-bojl.onrender.com",
    methods: ["GET", "POST"],
    credentials: true
  }
});




export function getReceiverSocketId ( userId  ){
    return userSocketMap[userId];
}


// used to store online user
const userSocketMap = {}; // key : user_id -> val : socket_id

io.on("connection", (socket) => {
  console.log("connected : ", socket.id);
  const user_id = socket.handshake.query.user_id;

  if (user_id) {
    userSocketMap[user_id] = socket.id;
  }
  // broad cast to all connected client // emit the event
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("disconnected : ", socket.id);
    delete userSocketMap[user_id];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
