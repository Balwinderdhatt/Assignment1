var fs = require('fs');
module.exports = function(req, res){
  let upUser = {
    "userName": req.body.userName,
    "email" : req.body.email,
    "id":parseInt(req.body.id),
    "password": "",
    "role": req.body.role,
  }
  fs.readFile('./data/users.json', 'utf8',function(err, data){
    if (err) throw err;
    let users = JSON.parse(data)
    console.log(users)
    let i = users.findIndex(user =>
      (user.id == upUser.id));
      if (i == -1){
        res.send({'message': 'Error'})
      }else{
        upUser.password = users[i].password;
        upUser.valid = users[i].valid;
        users[i] = upUser;
        fs.writeFile('./data/users.json', JSON.stringify(users),'utf8',function(err, data){
          if (err) throw err;
          res.send({'message':'Success', 'data': users[i] } )
        })
       
      }
  });
}