All code in this repository is available with The MIT License (MIT)
Copyright (c) <2016> <Tom Schofield>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


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

or if you suspect foul play from the network
./yalertunnel proxy 127.0.0.1:8080 ssl:via-eu-west-1.yaler.io:443 YOURYALERHERE


the arduino will call server_2.js as a process

Yun should run fieldVenturerOne_1 
Diecemillenuove should run fieldVenturerOne_slave (and have ada fruit motor shield).

i2c connections are
link ground on both boards
link yun pin 3 with diecemillenuove pin A5
link yun pin 2 with diecemillenuove pin A4

