const express = require('express');
const http = require("http")
const app = express();
const path = require("path")

const socketio = require("socket.io")
const server = http.createServer(app)

const io = socketio(server)

//ejs

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        //sending it back to frontend
        //what is spread operator(...data)
        io.emit("receive-location", {
            id: socket.id,
            ...data
        });
    });

    // console.log("connected");
    // console.log("connection" ,socket);
    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    })
});
app.use(express.static('public'));
app.get('/', function (req, res) {
    // res.send("hello")
    res.render("index")

});
server.listen(3000);
