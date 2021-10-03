// var fs = require('fs');
// module.exports = function(req, res){
//   let user ;
//   fs.readFile('./data/users.json', 'utf8',function(err, data){
//     if (err) throw err;
//     let users = JSON.parse(data)
//     // console.log(req.body.userName)
//     // console.log(user)
//     let i = users.findIndex(element =>
//       (req.body.userName == element.userName));
//       if (i == -1){
//         res.send({'message': 'Error'})
//       }else{
//         users.splice(i, 1);
//         fs.writeFile('./data/users.json', JSON.stringify(users),'utf8',function(err, data){
//           if (err) throw err;
//           res.send({'message':'Success', 'data': users } )
//         })
       
//       }
//       // console.log(i)
//   });
// }
var ObjectId = require('mongodb').ObjectID;
module.exports = (db, app)=>{
  var result ;
  app.post('/deleteUser', (req,res)=>{
    console.log("deleting")
    if (!req.body){
      return sendStatus(400);
    }
    userId = new ObjectId(req.body._id);
    console.log(userId)
    // var objectid = new ObjectId(productId);
    const collection = db.collection('users');
    collection.deleteOne({_id: userId}, (err, docs)=>{
      collection.find({}).toArray((err, data)=>{
        res.send(data);
      })
    })
  });
}