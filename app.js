const  express = require ('express');
const http = require("http")
const app = express();

const socketio = require("socket.io")
const server = http.createServer(app)

const io = socketio(server)

//ejs

app.set("view engine",ejs);
app.set(express.static(path.join(__dirname,"public")));
app.get('/' ,function(req,res){
    res.send("hey")
});
server.listen(3001);