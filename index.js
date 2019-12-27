var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
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

//Sends mock temperature data to the front end every 1s
//TODO: replace this with a function that listens for HTTP POST requests containing CAN messages in JSON,
//      parses it to its components and sends those as a JSON file.
setInterval(
    function(){

        //TODO:replace this
        var rawData;

        var data = parser.parseRaw(rawData);

        if (data['id'] === 0x622)
        {
            io.emit('battery-faults', data);
        }
        else if (data['id'] === 0x623)
        {
            io.emit('battery-voltage', data);
        }
        else if (data['id'] === 0x624)
        {
            io.emit('battery-current', data);
        }
        else if (data['id'] === 0x626)
        {
            io.emit('battery-soc', data);
        }
        else if (data['id'] === 0x627)
        {
            io.emit('battery-temperature', data)
        }
        else if (data['id'] === 0x401)
        {
            io.emit('motor-faults', data)
        }
        else if (data['id'] === 0x402)
        {
            io.emit('motor-power', data);
        }
        else if (data['id'] === 0x403)
        {
            io.emit('motor-speed', data);
        }

    },
    1000
)



