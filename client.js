//var app = require('express')();
var express = require('express'),app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var net = require('net');

var HOST = '127.0.0.1';//gsiot-p2js-7c2m.try.yaler.io';//192.168.1.102';
var PORT = 18080;

var client = new net.Socket();

client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function(socket){
	socket.on('arduino_instruction', function(msg){
		console.log('got arduino instruction: ' + msg);
		client.write(msg);
		//socket.emit('arduino message', "hi from arduino");
	});

	

  
  client.on('data', function(data) {

		///get signal back from arduino
		if(data.toString('ascii')=="received"){
			console.log('DATA: ' + data);
		}
		else{
			if(data.length>0) socket.emit('arduino message', data.toString('ascii'));
		}
		//console.log("sending arduino data to browser");
		

	});
  client.on('close', function() {
    console.log('Connection closed');
	});

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});