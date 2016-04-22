var net = require('net');
var repeat = require('repeat');
//var HOST = '127.0.0.1';

var HOST = '127.0.0.1';//gsiot-p2js-7c2m.try.yaler.io';//192.168.1.102';
var PORT = 18080;

var client = new net.Socket();

function writeChuck(){
	client.write('I am Chuck Norris!')
}
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    
   // sleep(10000, function() {
   //console.log("writing");
   

   //repeat(writeChuck).every(100, 'ms').for(0.3, 'minutes').start.in(5, 'sec');


});

// // Add a 'data' event handler for the client socket
// // data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
    // Close the client socket completely
    //client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

