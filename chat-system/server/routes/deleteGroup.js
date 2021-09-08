var fs = require('fs');
module.exports = function(req, res){
  // let user ;
  fs.readFile('./data/groups.json', 'utf8',function(err, data){
    if (err) throw err;
    let groups = JSON.parse(data)
    // console.log(req.body.userName)
    // console.log(user)
    let i = groups.findIndex(element =>
      (req.body.name == element.name));
      if (i == -1){
        res.send({'message': 'Error'})
      }else{
        groups.splice(i, 1);
        fs.writeFile('./data/groups.json', JSON.stringify(groups),'utf8',function(err, data){
          if (err) throw err;
          res.send({'message':'Success', 'data': groups } )
        })
       
      }
      // console.log(i)
  });
}