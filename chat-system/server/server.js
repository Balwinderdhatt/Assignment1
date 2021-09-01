const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
var bodyParser = require('body-parser');;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

var http = require('http').Server(app);
var server = http.listen(3000, function(){
  console.log("Server is running on port:3000")
});

app.use(express.static(__dirname + '/../dist/chat-system'));
app.post('/login', require('./routes/loginPost'));
app.post('/update', require('./routes/update'));
app.post('/addUser', require('./routes/addUser'));
app.get('/getUsers', require('./routes/getUsers'));