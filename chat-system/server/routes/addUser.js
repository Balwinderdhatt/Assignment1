
module.exports = (db, app)=>{
  app.post('/addUser', (req, res)=>{
    console.log("adding")
    if(!req.body){
      return res.sendStatus(400);
    };
    product = req.body
    console.log(product)
    const collection = db.collection('users');
    collection.find({'_id': product._id}).count((err, count)=>{
      if (count == 0){
        collection.insertOne(product, (err, dbres)=>{
          if(err) throw err;
          let num = dbres.insertedCount;
          // res.send({'num':num,err:null});
          // res.send({'message':"1 item added"});
          res.sendStatus(200)
          // res.send()
        })
      }else{
        res.send({num:0, err:"duplicate items"});
      }
    })
  })
  }
// var fs = require('fs');
// module.exports = function(req, res){
//   let newUser = {
//     "userName": req.body.name,
//     "email" : req.body.email,
//     "id":req.body.id,
//     "password": "",
//     "role": req.body.role,
//     "valid": false
//   }
//   fs.readFile('./data/users.json', 'utf8',function(err, data){
//     if (err) throw err;
//     let users = JSON.parse(data)
//     // console.log(users)
//     // console.log(user)
//     let i = users.findIndex(user =>
//       (user.userName == newUser.userName));
//       if (i !== -1){
//         // newUser.id = Math.floor((Math.random() * 100) + 1);
//         res.send({'message': 'Username already exists'})
//       }else{
//         // newUser.id = ID;
//         // upUser.password = users[i].password;
//         // upUser.valid = users[i].valid;
//         users.push(newUser);
//         fs.writeFile('./data/users.json', JSON.stringify(users),'utf8',function(err, data){
//           if (err) throw err;
//           res.send({'message':'Success', 'data': users } )
//         })
       
//       }
//   });
// }