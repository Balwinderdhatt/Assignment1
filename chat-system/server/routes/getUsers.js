var fs = require('fs');
module.exports = function(req, res){

  fs.readFile('./data/users.json', 'utf8',function(err, data){
    if (err) throw err;
    let users = JSON.parse(data)
    res.send(users);
  });
}