var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('index.html');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });

  socket.emit('arduino message', "hi from arduino");
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});