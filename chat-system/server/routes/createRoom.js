var fs = require('fs');
module.exports = function(req, res){
  let newRoom = {
    "name": req.body.name,
    "users" : req.body.users,
    "group":req.body.group,
   
  }

  fs.readFile('./data/rooms.json', 'utf8',function(err, data){
    if (err) throw err;
    let rooms = JSON.parse(data)
    console.log(rooms)
    // console.log(user)
    let i = rooms.findIndex(room =>
      (rooms.name == newRoom.name));
      if (i !== -1){
        res.send({'message': 'Error'})
      }else{
        
        rooms.push(newRoom);
        fs.writeFile('./data/rooms.json', JSON.stringify(rooms),'utf8',function(err, data){
          if (err) throw err;
          res.send({'message':'Success', 'data': rooms } )
        })
       
      }
  });
}