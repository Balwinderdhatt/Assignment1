var fs = require('fs');
module.exports = function(req, res){
  let upGroup = {
    "name": req.body.name,
    "users" : req.body.users,
   
  }
  fs.readFile('./data/groups.json', 'utf8',function(err, data){
    if (err) throw err;
    let groups = JSON.parse(data)
    // console.log(groups)
    // console.log(req.body)
    let i = groups.findIndex(group =>
      (group.name == upGroup.name));
      if (i == -1){
        res.send({'message': 'Error'})
      }else{
        // upUser.password = users[i].password;
        // upUser.valid = users[i].valid;
        // groups[i].users += upGroup.users
        // console.log(upGroup.users)
        upGroup.users.forEach(element => {
          groups[i].users.push(element)
        });
        console.log(groups[i].users)
        fs.writeFile('./data/groups.json', JSON.stringify(groups),'utf8',function(err, data){
          if (err) throw err;
          res.send({'message':'Success', 'data': groups[i] } )
        })
       
      }
  });
}