var fs = require('fs');
module.exports = function(req, res){
  fs.readFile('./data/users.json', 'utf8',function(err, data){
    if (err) throw err;
    let users = JSON.parse(data)
    console.log(users)
    console.log(req.body)
    let i = users.findIndex(user =>
      ((user.userName == req.body.userName)&& (user.password == req.body.password)));
      if (i == -1){
        res.send({'message': 'Error'})
      }else{
        users[i].valid = true;
        res.send({'message':'Success', 'data': users[i] } )
      }
  });
}
// let users = [
//   {userName: "jason", birthDate : '21/01/2001', age :24, email :'jason@abc.com', password : 'momoa', valid : false},
//   {userName : "richard", birthDate : '15/08/1990', age :31, email :'richard@abc.com', password : 'smith', valid : false},
//   {userName : "garry", birthDate : '09/11/2011', age :19, email :'garry@abc.com', password : 'sandhu', valid : false}
// ]
// console.log(req.body);


// users.forEach(user =>{
//   if (req.body.userName == user.userName && req.body.password == user.password){
//     user.valid = true;
//     console.log(user)
//     // res.send({'Welcome': 'good one mate'})
//   }else{
//     console.log('false')
//     // res.send({'error': 'invalid input'})
//   }
// })
// res.send(users)
// console.log(users)
// }
// class User {
//   userName = String();
//   birthDate = String();
//   age = Number();
//   email = String();
//   password = String();
//   valid = Boolean();
// }