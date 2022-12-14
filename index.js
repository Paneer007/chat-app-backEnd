const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const PORT = process.env.PORT||3001
const registerUserHandler = require('./socketEvents/user')
const registerGroupHandler = require('./socketEvents/group')
const io = require("socket.io")(server,{
    cors:{
        origin:'*' 
    }
})
server.listen(PORT,()=>{
    console.log('Listening on port',PORT)
})
const onConnection =(socket)=>{
    console.log('hi',socket.handshake.query['name'])
    socket.nickname = socket.handshake.query['name']
    registerUserHandler(io,socket)
    registerGroupHandler(io,socket)
}
io.on("connection",onConnection)