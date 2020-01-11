const debug = require("debug")("app:")
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require("body-parser");
var parser = require('./CAN_Parser/CANparse');

app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.json());
app.use(express.static('public'))

const port = process.env.PORT || 3000;

server.listen(port, () => {
    debug(`Server listening on port ${port}!`);
});

io.on(
    'connection',
    function(socket)
    {
        io.emit('introduction');
        console.log("socket connection initialized");
    }
);

app.post("/", (req, res) => {
    res.on(
        'error', 
        (err) => {
            console.error(err);
        }
    );

    console.log(req.body)
    var data = parser.canParser(req.body);
    console.log(data);

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

    res.status(200).send({message: "Received"});
});

module.exports = app;