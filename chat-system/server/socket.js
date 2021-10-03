module.exports = {
  connect: (io, Port) =>{
    // let rooms = ["room1", "room2", "room3"]
    var socketRoom = [] //list of socket.id and joined room
    var socketRoomCount = []
    let fs = require('fs');
  fs.readFile('./data/rooms.json', 'utf8',function(err, data){
    if (err) throw err;
    rooms = JSON.parse(data)
    
  });
    io.on('connection', (socket) =>{
      console.log('user Connection on port '+ Port + ' : ' + socket.id)

      socket.on('message', (message)=>{
        for (i=0;i<socketRoom.length;i++){
          if(socketRoom[i][0] == socket.id){
            io.to(socketRoom[i][1].emit('message', message))
            console.log("message")
          }
        }
        io.emit('message', message);
        // console.log(message)
      })

    
      // socket.on('inRoom', (room)=>{
      
      // })

      socket.on('newRoom', (newRoom)=>{
        if(rooms.indexOf(newRoom) == -1){
          rooms.push(newRoom)
          io.emit('roomList', JSON.stringify(rooms))
        }
      })

      socket.on('roomList', (m)=>{
        io.emit('roomList', JSON.stringify(rooms))
        console.log(rooms)
      })

      socket.on('userCount', (room)=>{
        let userCount = 0;
        for(i=0;i<socketRoomCount.length;i++){
          if(socketRoomCount[i][0] == room){
            userCount = socketRoomCount[i][1]
          }

        }
        io.in(room).emit("userCount", userCount)
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

        if (flag){

            socket.join(room.name)
            check(room);
         
            return io.in(room.name).emit("joined", socketRoom);
          }
        })

      socket.on("leaveRoom", (room)=>{
        for(let i=0;i<socketRoom.length;i++){
          if(socketRoom[i][0] == socket.id){
            socketRoom.splice(i, 1);
            socket.leave(room);;
            io.to(room).emit("notice", "A user has left");
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
        io.emit('disconnection');
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
            socketRoom[i][0] = room.name;
            inRoom = true;
          }
        }
        console.log('inRoom', inRoom)
        console.log("socketRoom",socketRoom)
      
      if (inRoom == false){
        socketRoom.push([socket.id, room.name]);
        console.log(socketRoom)
        var hasroomnum = false;
        for(let j=0;j<socketRoomCount.length;j++){
          if (socketRoomCount[j][0] == room.name){
            socketRoomCount[j][1] = socketRoomCount[j][1] +1;
            hasroomnum = true;
          }
        }
        if(hasroomnum == false){
          socketRoomCount.push([room.name,1]);
        }
      }
      
      io.in(room).emit("notice", "A new user has Joined");
      
      }

    })
    
  }
}

