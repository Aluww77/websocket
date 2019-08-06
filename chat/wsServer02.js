var ws = require("nodejs-websocket")

var PORT = 3000

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
  console.log("New connection")
  conn.on("text", function (str) { // 客户端有消息发送过来时的回调函数
    console.log("Received " + str)
    conn.sendText(str.toUpperCase() + "!!!") // 发送给客户端消息
  })
  conn.on("close", function (code, reason) {
    console.log("Connection closed")
  })
  // 出错时触发，并且会关闭连接。这时可以根据错误信息进行按需处理
  conn.on("error", function (err) {
    console.log("handle err")
    console.log(err)
  })
}).listen(PORT)

console.log("websocket server listening on port" + PORT)