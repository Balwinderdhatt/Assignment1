// var fs = require('fs');
// module.exports = function(req, res){
//    let userGroup = {
//      user :req.body.userSelected,
//      group : req.body.group
//    } ;
//    console.log(userGroup)
//   fs.readFile('./data/groups.json', 'utf8',function(err, data){
//     if (err) throw err;
//     let groups = JSON.parse(data)
//     // console.log(req.body.userName)
//     // console.log(user)
//     let i = groups.findIndex(element =>
//       (userGroup.group.name == element.name));
//       if (i == -1){
//         res.send({'message': 'Error'})
//       }else{
//         let j = groups[i].users.findIndex(user =>
//           (userGroup.user.userName == user.userName));
//           if (i == -1){
//             res.send({'message': 'Error'})
//           }else{
//             // console.log(groups[i].users[j])
//             groups[i].users.splice(j, 1);
//             fs.writeFile('./data/groups.json', JSON.stringify(groups),'utf8',function(err, data){
//               if (err) throw err;
//               res.send({'message':'Success', 'data': groups } )
//       })
//           }
//       }
//       // console.log(i)
//   });
// }
//  db.groups.updateOne({_id: ObjectId("6158ef10222e0d3b37208058")}, {$pull: {users: {id: ObjectId("6158efb0222e0d3b3720805c")}}})
var ObjectId = require('mongodb').ObjectID;
module.exports = (db, app)=>{
  var result ;
  app.post('/deleteuserfromGroup', (req,res)=>{
    // console.log("deleting")
    if (!req.body){
      return sendStatus(400);
    }
    userId = new ObjectId(req.body.userSelected.id);
    // userId = req.body.userSelected.id;
    groupId = new ObjectId(req.body.group._id)
    console.log(userId)
    console.log(groupId)
    // var objectid = new ObjectId(productId);
    const collection = db.collection('groups');
    collection.updateOne({_id: groupId}, {$pull: {users: {id: userId}}}, (err, docs)=>{
      collection.find({}).toArray((err, data)=>{
        res.send(data);
      })
    });
  });
}