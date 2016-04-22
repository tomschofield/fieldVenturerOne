# fieldVenturerOne
code and resources for remote controlled exhibition sensing vehicle (uses arduino yun, node js, socketio

from OS X client run

java YalerTunnel client 127.0.0.1:18080 try.yaler.io:80 YOURYALERHERE &

then run

node client.js

open a browser at the http://127.0.0.1:3000

(this will look forward and server index.html if it’s in the same directory as client.js



on YUN make sure the following is running (it’s a start up script so you shouldn’t have to launch it)

./yalertunnel proxy 127.0.0.1:8080 try.yaler.io:80 YOURYALERHERE


the arduino will call server_2.js as a process

Yun should run fieldVenturerOne_1 
Diecemillenuove should run fieldVenturerOne_slave (and have ada fruit motor shield).

i2c connections are
link ground on both boards
link yun pin 3 with diecemillenuove pin A5
link yun pin 2 with diecemillenuove pin A4

