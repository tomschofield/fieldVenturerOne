//var app = require('express')();
var express = require('express'),app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var net = require('net');

var HOST = '127.0.0.1';//gsiot-p2js-7c2m.try.yaler.io';//192.168.1.102';
var PORT = 18080;

var client = new net.Socket();

var is_connected = false;

var io_connection;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));




function openSocket() {
    //client.removeListener('connect');
    // client.remove('error');
    // client.remove('close');

    client = net.connect(PORT, HOST);
    client.setKeepAlive(true);
    client.on('connect', onConnect.bind({}, client));
    client.on('error', onError.bind({}, client));
    client.on('close', onClose.bind({}, client));
}
var interval;

// io.connect('http://localhost', {
//   'reconnect': true,
//   'reconnection delay': 500,
//   'max reconnection attempts': 10
// });

function onConnect(socket) {

    console.log('Socket is open!');

    ///open the socet io connection to receive inbound messages from the browser
    io.on('connection', function(socket){
        console.log("io connected")
        //this creates
        socket.on('arduino_instruction', function(msg){
            //console.log('got arduino instruction: ' + msg);
            client.write(msg);
            //socket.emit('arduino message', "hi from arduino");
        });
        socket.on('disconnect', function () { 
            console.log("io disconnect");
        });

        client.on('data', function(data) {

            ///get signal back from arduino
            if(data.toString('ascii')=="received"){
            //console.log('DATA: ' + data);
            }
            else{
            //console.log("got");
            if(data.length>0) socket.emit('arduino message', data.toString('ascii'));
            }
            //console.log("sending arduino data to browser");
        });
    });
}

function onClose(socket) {

    console.log('Socket is closed!');
    
    socket.destroy();
    socket.unref();

     socket.emit('lost connection', "lost connection");
   // io_connection.off= io_connection.removeListener;
    //remove the listeners before we
    
   // io.disconnect();

    // Re-open socket
    setTimeout(openSocket, 5e3);

    
}

function onError(socket) {

    console.log('Socket error!');

    // Kill socket
    
    socket.destroy();
    socket.unref();
 //    io.disconnect();

    // Re-open socket
    setTimeout(openSocket, 5e3);
}

openSocket();




http.listen(3000, function(){
  console.log('listening on *:3000');
});