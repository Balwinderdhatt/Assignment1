
module.exports = (db, app)=>{
  var ObjectId = require('mongodb').ObjectID;
  // var result ;
  // objId = new ObjectId
  app.post('/findUser', (req,res)=>{
    if (!req.body){
      return res.sendStatus(400);
    }
    objId = new ObjectId(req.body.id)
    console.log(objId)
    // objId = "ObjectId('" + req.body.id + "')"
    const collection = db.collection('users');  
    collection.find(objId).toArray((err, data)=>{
            res.send(data);
            console.log(data)
          })
    // console.log(data)
    // res.send(data)

  })

}
var id = require('mongodb').ObjectID;
// module.exports = (db, app)=>{
//   var result ;
//   app.post('/findUser', (req,res)=>{
//     // console.log(re)
//     if (!req.body){
//       return sendStatus(400);
//     }
//     product = req.body;
//     // id = new id(product._id);
//     console.log(product);
//     // var id = new require('mongodb').ObjectID(product._id)
//     // var objectid = new ObjectID()
//     // var objectid = product.id ;
//     // console.log(product._id)
//     const collection = db.collection('users');
//     // collection.find({_id: objectid}).toArray((err, data)=>{
//     //   res.send(data);
//     //   console.log(data)
//     // })
//     // collection.updateOne({id: objectid}, {$set: {name: product.name, description : product.description, price: product.price, units: product.units}}, ()=>{
//     //   res.send({'ok': product.objectid});
//     // });
//     res.send({'ok': product});
//   });
// }


