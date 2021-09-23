const http = require("http");
const path=require('path');

const express = require("express");

const app= express();
const server=http.createServer(app);

const port=process.env.PORT || 3000;

app.use(express.static(path.join(__dirname+'/public')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});


// Socket.io started  

const users={};

const io=require('socket.io')(server);

io.on("connection",(socket)=>{
  
  socket.on('new-user-joined',(user)=>{
      users[socket.id]=user;
      console.log(users);
      socket.broadcast.emit('user-joined',user)
  });
 socket.on('send',(message)=>{
      socket.broadcast.emit('recieve',{message: message,name: users[socket.id]});
  });

  socket.on('disconnect',(message)=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
});

});




server.listen(port,()=>{
    console.log("server started at "+port);
});