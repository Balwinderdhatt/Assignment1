module.exports = {
  connect: (io, Port) =>{
    io.on('connection', (socket) =>{
      console.log('user Connection on port '+ Port + ' : ' + socket.id)

      socket.on('message', (message)=>{
        io.emit('message', message);
      })
    })
  }
}