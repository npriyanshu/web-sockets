import express from 'express';
import { Server } from 'socket.io';
import {createServer} from "http";
import cors from "cors"
const port = 3000;

const app = express();
const server = createServer(app); 
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true,
    }
});

app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello world!")
});

io.on("connection",(socket)=>{
console.log("id",socket.id)

socket.on("message", ({room,message}) => {
    console.log({room,message});
    io.to(room).emit("receive-message", message);
  });
  
// socket.broadcast.emit("welcome",`welcome to the server ${socket.id}`)
})




server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})