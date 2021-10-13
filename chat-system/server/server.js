const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const formidable = require('formidable');

const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
app.use(cors())
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
var port = 3000;
var http = require('http').Server(app);
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, (err, client)=>{
  if (err){
    return console.log(err)
  }
const dbName = 'chatDb';
const db = client.db(dbName);
var server = http.listen(port, function(){
  console.log("Server is running on port:3000")
});
module.exports = server
const sockets = require('./socket');
const io = require("socket.io")(http,{
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
})

sockets.connect(io, port, db)


  
require('./routes/getUsers')(db, app);
require('./routes/addUser')(db, app);
require('./routes/getGroups')(db, app);
// require('./routes/findUser')(db, app);
require('./routes/addUsertoGroup')(db, app);
require('./routes/createGroup')(db, app);
require('./routes/login')(db,app);
require('./routes/deleteUser')(db, app);
require('./routes/deleteGroup')(db, app);
require('./routes/deleteuserfromGroup')(db,app);
require('./routes/upload')(formidable,app);

})

app.use(express.static(__dirname + '/../dist/chat-system'));
app.use('/images' , express.static(path.join(__dirname + './images')));



// app.post('/login', require('./routes/loginPost'));
app.post('/update', require('./routes/update'));
// app.post('/addUser', require('./routes/addUser'));
// app.get('/getUsers', require('./routes/getUsers'));
// app.post('/createGroup', require('./routes/createGroup'));
// app.post('/deleteUser', require('./routes/deleteUser'));
// app.post('/addUsertoGroup', require('./routes/addUsertoGroup'));
// app.post('/deleteGroup', require('./routes/deleteGroup'));
// app.post('/deleteuserfromGroup', require('./routes/deleteuserfromGroup'));
app.post('/createRoom', require('./routes/createRoom'));

// app.get('/getGroups', function(req,res){
//   let fs = require('fs');
//   fs.readFile('./data/groups.json', 'utf8',function(err, data){
//     if (err) throw err;
    // let groups = JSON.parse(data)
    // res.send(groups);
//   });
// });
app.get('/getRooms', function(req,res){
  let fs = require('fs');
  fs.readFile('./data/rooms.json', 'utf8',function(err, data){
    if (err) throw err;
    let rooms = JSON.parse(data)
    res.send(rooms);
  });
});