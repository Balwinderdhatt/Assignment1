// var fs = require('fs');
// module.exports = function(req, res){
//   let newGroup = {
//     "name": req.body.name,
//     "users" : req.body.users,
//     "id":req.body.id,
   
//   }

//   fs.readFile('./data/groups.json', 'utf8',function(err, data){
//     if (err) throw err;
//     let groups = JSON.parse(data)
//     console.log(groups)
//     // console.log(user)
//     let i = groups.findIndex(group =>
//       (group.id == newGroup.id));
//       if (i !== -1){
//         newGroup.id = Math.floor((Math.random() * 100) + 1);
//         // res.send({'message': 'Error'})
//       }else{
//         // newUser.id = ID;
//         // upUser.password = users[i].password;
//         // upUser.valid = users[i].valid;
//         groups.push(newGroup);
//         fs.writeFile('./data/groups.json', JSON.stringify(groups),'utf8',function(err, data){
//           if (err) throw err;
//           res.send({'message':'Success', 'data': groups } )
//         })
       
//       }
//   });
// }

var ObjectId = require('mongodb').ObjectID;
module.exports = (db, app)=>{
  app.post('/createGroup', (req, res)=>{
    console.log("adding")
    if(!req.body){
      return res.sendStatus(400);
    };
    groupName = req.body.name
    newUsers = req.body.users
    group = req.body
    // console.log(newUsers)
    newUsers.forEach(element => {
      element.id = new ObjectId(element.id)
    });
    console.log(newUsers)
    const collection = db.collection('groups');
    collection.find({'name': group.name}).count((err, count)=>{
      if (count == 0){
        collection.insertOne(group, (err, dbres)=>{
          if(err) throw err;
          let num = dbres.insertedCount;
          // res.send({'num':num,err:null});
          res.send({'message':"1 item added"});
          // res.sendStatus(200)
          // res.send()
        })
      }else{
        res.send({num:0, err:"duplicate items"});
      }
    })
  })
  }