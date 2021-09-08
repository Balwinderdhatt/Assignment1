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
        // newGroup.id = Math.floor((Math.random() * 100) + 1);
        res.send({'message': 'Error'})
      }else{
        // newUser.id = ID;
        // upUser.password = users[i].password;
        // upUser.valid = users[i].valid;
        // groups.push(newGroup);
        fs.writeFile('./data/rooms.json', JSON.stringify(roomss),'utf8',function(err, data){
          if (err) throw err;
          res.send({'message':'Success', 'data': rooms } )
        })
       
      }
  });
}