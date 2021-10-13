var ObjectId = require('mongodb').ObjectID;
module.exports = {
  connect: (io, Port, db) =>{
    // let rooms = ["room1", "room2", "room3"]
    var socketRoom = [] //list of socket.id and joined room
    var socketRoomCount = []
    const chat = io.of('/chat');
    
    const collection = db.collection('rooms');  
    collection.find({}).toArray((err, data)=>{
      rooms= data;
    })
  //   let fs = require('fs');
  // fs.readFile('./data/rooms.json', 'utf8',function(err, data){
  //   if (err) throw err;
  //   rooms = JSON.parse(data)
    
  // });

    chat.on('connection', (socket) =>{
      // console.log('user Connection on port '+ Port + ' : ' + socket.id)

      socket.on('message', (message)=>{
        for (i=0;i<socketRoom.length;i++){
          if(socketRoom[i][0] == socket.id){
            // console.log(socketRoom[i][1])
            chat.to(socketRoom[i][1]).emit('message', message)
            collection.updateOne({name:socketRoom[i][1]}, {$push: {messages: message}})
          }
        }
        // io.emit('message', message);
        // console.log(message)
      })

    
      // socket.on('inRoom', (room)=>{
      
      // })

      socket.on('newRoom', (newRoom)=>{
        if(rooms.indexOf(newRoom) == -1){
          rooms.push(newRoom)
          chat.emit('roomList', JSON.stringify(rooms))
        }
      })

      socket.on('roomList', (m)=>{
        chat.emit('roomList', JSON.stringify(rooms))
        console.log(rooms)
      })

      socket.on('userCount', (room)=>{
        let userCount = 0;
        for(i=0;i<socketRoomCount.length;i++){
          if(socketRoomCount[i][0] == room){
            userCount = socketRoomCount[i][1]
          }

        }
        chat.in(room).emit("userCount", userCount)
      })

      // socket.on("joinRoom", (room)=>{
      //   io.join((room)=>{
      //     console.log(room, "joined")
      //   })

      // })

      socket.on('joinRoom', (room)=>{
        flag = false
        rooms.forEach(element => {
          if (element.name  == room.name){
            flag = true;
          }
          
        });

        if (flag == true){
          // if(rooms.includes(room)){
          room_id = new ObjectId(room._id)
            socket.join(room.name)
            check(room.name);
            let newUser = room.new
            collection.find({_id:room_id}).count((err, count)=>{
              if (count !== 0 ){
                console.log(count)
                collection.updateOne({_id:room_id}, {$push: {users: newUser}}, ()=>{
                  return chat.in(room).emit("joined", socketRoom);
                });
              }
            })
            // collection.find({'name': group.name}).count((err, count)=>{})
            // let i = rooms.findIndex(el =>
            //   (el.name == room.name));
            //   if (i !== -1){
            //     rooms[i].users.push(newUser)
            //     // console.log(rooms[i].users)
            //   }
            // this.rooms.users.push()
            return chat.in(room).emit("joined", socketRoom);
          }
        })

      socket.on("leaveRoom", (room)=>{
        for(let i=0;i<socketRoom.length;i++){
          if(socketRoom[i][0] == socket.id){
            socketRoom.splice(i, 1);
            socket.leave(room);;
            chat.to(room).emit("notice", "A user has left");
          }
        }

        for (let i=0;i<socketRoomCount.length;i++){
          if(socketRoomCount[i][0] == room){
            socketRoomCount[i][1] = socketRoomCount[i][1] -1;
            if(socketRoomCount[i][1] == 0){
              socketRoomCount.splice(i,1);
            }

          }
        }
      })

      socket.on('disconnection', ()=>{
        chat.emit('disconnection');
        for(let i=0;i<socketRoom.length;i++){
          if(socketRoom[i][0] == room){
            socketRoom.splice(i,1);
          }
        }
        for(let i=0;i<socketRoomCount.length;i++){
          if(socketRoomCount[i][0] == socketRoomCount.room){
            socketRoomCount[i][1] = socketRoomCount[i][1] -1;
          }
        }
        console.log('Client Disconnected')
      })

      check = function (room){
        console.log("flag")
        
        var inRoom = false;
        console.log("inRoom",inRoom)
        for(let i=0;i<socketRoom.length;i++){
          if(socketRoom[i][0] == socket.id){
            socketRoom[i][1] = room;
            inRoom = true;
          }
        }
        // console.log('inRoom', inRoom)
        // console.log("socketRoom",socketRoom)
      
      if (inRoom == false){
        socketRoom.push([socket.id, room]);
        console.log(socketRoom)
        var hasroomnum = false;
        for(let j=0;j<socketRoomCount.length;j++){
          if (socketRoomCount[j][0] == room){
            socketRoomCount[j][1] = socketRoomCount[j][1] +1;
            hasroomnum = true;
          }
        }
        if(hasroomnum == false){
          socketRoomCount.push([room,1]);
        }
      }
      
      chat.in(room).emit("notice", "A new user has Joined");
      
      }

    })
    
  }
}

// db.rooms.insertOne({name:"Assignment", users: [{userName:"jason", id:ObjectId("6158043a8a96761d82ad5256")}, {userName: "alysha", id: ObjectId("6157f03a8037b5e298c91ebc")}], messages:[{author:"alysha", body: "Hi josh"}, {author:'josh', body:"hey baby how u doin"}]})