var ws = require("nodejs-websocket")

var PORT = 3000

var clientCount = 0;

var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++
	conn.nickname = 'user' + clientCount
	broadcast(conn.nickname + " come in") // 给每个客户端进行广播
	conn.on("text", function (str) {
		console.log("Received "+str)
		broadcast(conn.nickname + ' says:' + str)
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		broadcast(conn.nickname + ' left')
	})
	conn.on("error",function(err) {
		console.log("handle err")
		console.log(err)
	})
}).listen(PORT)

console.log("websocket server listening on port" + PORT)

function broadcast(str){
	//server.connections 取到该server的所有连接
	server.connections.forEach(function(connection){
		connection.sendText(str);
	})
}