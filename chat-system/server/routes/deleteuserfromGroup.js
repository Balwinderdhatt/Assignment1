var fs = require('fs');
module.exports = function(req, res){
   let userGroup = {
     user :req.body.userSelected,
     group : req.body.group
   } ;
   console.log(userGroup)
  fs.readFile('./data/groups.json', 'utf8',function(err, data){
    if (err) throw err;
    let groups = JSON.parse(data)
    // console.log(req.body.userName)
    // console.log(user)
    let i = groups.findIndex(element =>
      (userGroup.group.name == element.name));
      if (i == -1){
        res.send({'message': 'Error'})
      }else{
        let j = groups[i].users.findIndex(user =>
          (userGroup.user.userName == user.userName));
          if (i == -1){
            res.send({'message': 'Error'})
          }else{
            // console.log(groups[i].users[j])
            groups[i].users.splice(j, 1);
            fs.writeFile('./data/groups.json', JSON.stringify(groups),'utf8',function(err, data){
              if (err) throw err;
              res.send({'message':'Success', 'data': groups } )
      })
          }
      }
      // console.log(i)
  });
}