import { Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {io} from "socket.io-client";
const App = () => {
const [message,setMessage] = useState("");
const [room,setRoom] = useState("");
const [socketID,setSocketID] = useState("");
  const socket = useMemo(()=>io("http://localhost:3000"),[]);

const handleSubmit = (e)=>{
  e.preventDefault();
  socket.emit("message",{message,room});
  setMessage('');

}

useEffect(() => {
  socket.on("connect",()=>{
    console.log("connected",socket.id)
    setSocketID(socket.id)
  })
  socket.on("welcome",(d)=>{
console.log(d)
  });


  socket.on("receive-message",(s)=>console.log(s))
  
})


  return (

    <Container maxWidth="sm">

<Typography>
  {
    socketID
  }
</Typography>
<form onSubmit={handleSubmit}
>
  <TextField
  value={message}
  onChange={(e)=>setMessage(e.target.value)}
  id="outlined-basic"
  label="Message"
  variant="outlined">
  </TextField>

  <TextField
  value={room}
  onChange={(e)=>setRoom(e.target.value)}
  id="outlined-basic"
  label="Room"
  variant="outlined">
  </TextField>

  
  <Button type="submit" variant="contained" color="primary" >
Send
    </Button>
</form>
    </Container>
  )
}

export default App