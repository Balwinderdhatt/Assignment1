module.exports = (db, app)=>{
  // var result ;
  app.get('/getGroups', (req,res)=>{
    console.log("gettingGroups")
    const collection = db.collection('groups');  
    // collection.find({users:{"users": "_id"}}).toArray((err, data)=>{ console.log("group", data)})
   
    collection.find({}).toArray((err, data)=>{
      // data[0].users.forEach(element => {
      //   x = db.collection('users').find({_id:element._id})
      //   // console.log(x)
      // });
      // console.log(data[0])
      res.send(data);
    })
  })
}

//  db.groups.insertMany([{name: "HR Group", users: [
//    ObjectId("6157efc88037b5e298c91eb8"),
//    ObjectId("6157efc88037b5e298c91ebb"),
//    ObjectId("6157f03a8037b5e298c91ebc")
//   ]}
// ])

// db.groups.insertMany([{name: "IT group",users: {"users": [ObjectId("6157efc88037b5e298c91eb8"),ObjectId("6157f03a8037b5e298c91ebc"), ObjectId("6157efc88037b5e298c91ebb")]} }])