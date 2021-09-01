var fs = require('fs');
module.exports = function(req, res){
  let newGroup = {
    "name": req.body.name,
    "users" : req.body.users,
    "id":req.body.id,
   
  }

  fs.readFile('./data/groups.json', 'utf8',function(err, data){
    if (err) throw err;
    let groups = JSON.parse(data)
    console.log(groups)
    // console.log(user)
    let i = groups.findIndex(group =>
      (group.id == newGroup.id));
      if (i !== -1){
        newGroup.id = Math.floor((Math.random() * 100) + 1);
        // res.send({'message': 'Error'})
      }else{
        // newUser.id = ID;
        // upUser.password = users[i].password;
        // upUser.valid = users[i].valid;
        groups.push(newGroup);
        fs.writeFile('./data/groups.json', JSON.stringify(groups),'utf8',function(err, data){
          if (err) throw err;
          res.send({'message':'Success', 'data': groups } )
        })
       
      }
  });
}