var net = require('net');
var readline = require('readline'); // include the readline module

var HOST = '127.0.0.1';
var PORT = 8080;


var lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection

function open(){
    net.createServer(function(sock) {
        
        // We have a connection - a socket object is assigned to the connection automatically
        console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

        lineReader.on('line', function (data) {
            //console.log('sending val from arduino: '+ data);
            sock.write(data);
        });
        
        // Add a 'data' event handler to this instance of socket
        sock.on('data', function(data) {
            console.log(data);
            //console.log("test");
            //console.log('DATA ' + sock.remoteAddress + ': ' + data);
            // Write the data back to the socket, the client will receive it as data from the server
            //sock.write('You said "' + data + '"');
            
        });
        
        // Add a 'close' event handler to this instance of socket
        sock.on('close', function(data) {
            //console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
            open();
        });
        
    }).listen(PORT, HOST);
}
open();
console.log('Server listening on ' + HOST +':'+ PORT);