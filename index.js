var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var parser = require('./CAN_Parser/CANparse');

var port = process.env.PORT || 3000;

server.listen(
    port, 
    function() 
    {
        console.log('server listening at port %d', port);
    }
);

app.use(express.static(path.join(__dirname, '/client')));

io.on(
    'connection',
    function(socket)
    {
        io.emit('introduction');
        console.log("socket connection initialized");
    }
)

http.createServer(
    (request, response) => {
        const { headers, method, url } = request;
        let body = [];
        request.on(
            'error', 
            (err) => {
                console.error(err);
            }
        ).on(
            'data', 
            (chunk) => {
                body.push(chunk);
            }
        ).on(
            'end', 
            () => {

                body = Buffer.concat(body).toString();
                body = JSON.parse(body);

                response.on(
                    'error', 
                    (err) => {
                        console.error(err);
                    }
                );

                var data = parser.canParser(body);

                if (data['ID'] === 0x622)
                {
                    io.emit('battery-faults', data);
                }
                else if (data['ID'] === 0x623)
                {
                    io.emit('battery-voltage', data);
                }
                else if (data['ID'] === 0x624)
                {
                    io.emit('battery-current', data);
                }
                else if (data['ID'] === 0x626)
                {
                    io.emit('battery-soc', data);
                }
                else if (data['ID'] === 0x627)
                {
                    io.emit('battery-temperature', data)
                }
                else if (data['ID'] === 0x401)
                {
                    io.emit('motor-faults', data)
                }
                else if (data['ID'] === 0x402)
                {
                    io.emit('motor-power', data);
                }
                else if (data['ID'] === 0x403)
                {
                    io.emit('motor-velocity', data);
                }
                else if (data['ID'] === 0x40B)
                {
                    io.emit('motor-temperature', data);
                }

                response.statusCode = 200;
                response.end();

            }
        );
    }
).listen(8080);


