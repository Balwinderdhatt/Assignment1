var fs = require('fs');
module.exports = function(req, res){
  let user ;
  fs.readFile('./data/users.json', 'utf8',function(err, data){
    if (err) throw err;
    let users = JSON.parse(data)
    // console.log(req.body.userName)
    // console.log(user)
    let i = users.findIndex(element =>
      (req.body.userName == element.userName));
      if (i == -1){
        res.send({'message': 'Error'})
      }else{
        users.splice(i, 1);
        fs.writeFile('./data/users.json', JSON.stringify(users),'utf8',function(err, data){
          if (err) throw err;
          res.send({'message':'Success', 'data': users } )
        })
       
      }
      // console.log(i)
  });
}