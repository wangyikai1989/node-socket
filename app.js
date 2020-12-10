var app = require('express')();
var http = require('http').createServer(app);

// websocket服务端
var io = require('socket.io')(http, {
  // 3.0+解决跨域
  cors: {
    origin: "http://10.20.158.29:9000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

var id = 0
// 当有客户来连接我、并连接成功时
io.on('connection', (socket) => {
  console.log('有人连接我')
  id++
  io.emit('client', `欢迎 ${id} 加入聊天室`)
  // 接受来自客户端的消息
  socket.on('server', msg=>{
      io.emit('client', id+'：'+msg)
  })
})

http.listen(8888, () => {
  console.log('websocket running on 8888')
})
