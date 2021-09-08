var fs = require('fs');
module.exports = function(req, res){
  let newUser = {
    "userName": req.body.name,
    "email" : req.body.email,
    "id":req.body.id,
    "password": "",
    "role": req.body.role,
    "valid": false
  }
  fs.readFile('./data/users.json', 'utf8',function(err, data){
    if (err) throw err;
    let users = JSON.parse(data)
    // console.log(users)
    // console.log(user)
    let i = users.findIndex(user =>
      (user.userName == newUser.userName));
      if (i !== -1){
        // newUser.id = Math.floor((Math.random() * 100) + 1);
        res.send({'message': 'Username already exists'})
      }else{
        // newUser.id = ID;
        // upUser.password = users[i].password;
        // upUser.valid = users[i].valid;
        users.push(newUser);
        fs.writeFile('./data/users.json', JSON.stringify(users),'utf8',function(err, data){
          if (err) throw err;
          res.send({'message':'Success', 'data': users } )
        })
       
      }
  });
}