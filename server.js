const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http,{
  pingTimeout: 3000000, 
  // pingInterval: 20000, 
});

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

const users = {};
io.on("connection", (socket) => {
  // console.log("user connected");

  socket.on("new-user-joined", (user) => {
    users[socket.id] = user;
    // console.log(users);
    socket.broadcast.emit("user-joined", user);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("leave", users[socket.id]);
    delete users[socket.id];
  });
});

// http.listen(5000, () => {
//     console.log('listening on *:5000');
//   });

http.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
