const express = require('express');
const app = express();
const cors = require('cors');
const sockets = require('./socket');
app.use(cors())
var bodyParser = require('body-parser');;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
var port = 3000;
var http = require('http').Server(app);
var server = http.listen(port, function(){
  console.log("Server is running on port:3000")
});

const io = require("socket.io")(http,{
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
})
io.on('connection', (socket) =>{
  console.log('user Connection on port '+ port + ' : ' + socket.id)

  socket.on('message', (message)=>{
    io.emit('message', message);
  })
})

app.use(express.static(__dirname + '/../dist/chat-system'));
app.post('/login', require('./routes/loginPost'));
app.post('/update', require('./routes/update'));
app.post('/addUser', require('./routes/addUser'));
app.get('/getUsers', require('./routes/getUsers'));
app.post('/createGroup', require('./routes/createGroup'));
app.post('/deleteUser', require('./routes/deleteUser'));
app.post('/addUsertoGroup', require('./routes/addUsertoGroup'));
app.post('/deleteGroup', require('./routes/deleteGroup'));
app.post('/deleteuserfromGroup', require('./routes/deleteuserfromGroup'));
app.post('/createRoom', require('./routes/createRoom'));
app.get('/getGroups', function(req,res){
  let fs = require('fs');
  fs.readFile('./data/groups.json', 'utf8',function(err, data){
    if (err) throw err;
    let groups = JSON.parse(data)
    res.send(groups);
  });
});
app.get('/getRooms', function(req,res){
  let fs = require('fs');
  fs.readFile('./data/rooms.json', 'utf8',function(err, data){
    if (err) throw err;
    let rooms = JSON.parse(data)
    res.send(rooms);
  });
});