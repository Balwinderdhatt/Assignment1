// var fs = require('fs');
// module.exports = function(req, res){
//   let upGroup = {
//     "name": req.body.name,
//     "users" : req.body.users,
   
//   }
//   fs.readFile('./data/groups.json', 'utf8',function(err, data){
//     if (err) throw err;
//     let groups = JSON.parse(data)
//     // console.log(groups)
//     // console.log(req.body)
//     let i = groups.findIndex(group =>
//       (group.name == upGroup.name));
//       if (i == -1){
//         res.send({'message': 'Error'})
//       }else{
//         // upUser.password = users[i].password;
//         // upUser.valid = users[i].valid;
//         // groups[i].users += upGroup.users
//         // console.log(upGroup.users)
//         upGroup.users.forEach(element => {
//           groups[i].users.push(element)
//         });
//         console.log(groups[i].users)
//         fs.writeFile('./data/groups.json', JSON.stringify(groups),'utf8',function(err, data){
//           if (err) throw err;
//           res.send({'message':'Success', 'data': groups[i] } )
//         })
       
//       }
//   });
// }
var ObjectId = require('mongodb').ObjectID;
module.exports = (db, app)=>{
  app.post('/addUsertoGroup', (req, res)=>{
    console.log("adding")
    if(!req.body){
      return res.sendStatus(400);
    };
    group = new ObjectId(req.body.group)
    console.log(group)
    newusers = req.body.new
    const collection = db.collection('groups');
    collection.find(group).count((err, count)=>{
      if (count !== 0){
        collection.updateOne({_id:group}, {$push: {users: {$each: newusers}}}, ()=>{
          res.send({'ok': group});
        });
      }else{
        res.send({num:0, err:"duplicate items"});
      }
    })
  })
  }
  // db.groups.updateOne({_id:ObjectId("6158c2248037b5e298c91ec6")}, {$push:{users:[{name:'tyler', id:ObjectId("6157efc88037b5e298c91eba")}]}})