


module.exports = (db, app)=>{
  // var result ;
  app.post('/login', (req,res)=>{
    let uName = req.body.userName
    let pass = req.body.password
    const collection = db.collection('users');  
    collection.find({name: uName}).toArray((err, data)=>{
      if ((data[0].name == uName) && (data[0].password == pass)){
        res.send({'message':'Success', 'data': data[0] } )
      }else{
        res.send({'message': 'Error'})
      }
      
    })
  })

}