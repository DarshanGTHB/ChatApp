import {Server} from  "socket.io"
import express from "express"
import http from "http"


const app = express();

const server = http.createServer(app);
// socket io server on top of express server

const io = new Server(server,{
    cors:["http://localhost:5173"]
})

io.on("connection", (socket) => {
    console.log("connected : ", socket.id);

    socket.on("disconnect", () => {
        console.log("disconnected : ", socket.id);
    })
})


export {io, server, app};