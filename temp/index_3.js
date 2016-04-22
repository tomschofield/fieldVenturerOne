var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var net = require('net');

var HOST = '127.0.0.1';//gsiot-p2js-7c2m.try.yaler.io';//192.168.1.102';
var PORT = 18080;

var client = new net.Socket();

client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

app.get('/', function(req, res){
  res.sendFile('index.html');
});


io.on('connection', function(socket){
	socket.on('chat message', function(msg){
	console.log('message: ' + msg);
	});

	

  socket.emit('arduino message', "hi from arduino");
 //  client.on('data', function(data) {

	// 	console.log('DATA: ' + data);
	// 	socket.emit('arduino message', data);

	// });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});