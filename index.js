var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

server.listen(
    port, 
    function() 
    {
        console.log('Server listening at port %d', port);
    }
);

app.use(express.static(path.join(__dirname, '/client')));

io.on(
    'connection',
    function(socket)
    {
        console.log("Initial Message Sent");
        io.emit('introduction');
    }
)

var parseData = require("./CANparse.js");

//Sends mock temperature data to the front end every 1s
//TODO: replace this with a function that listens for HTTP POST requests containing CAN messages in JSON,
//      parses it to its components and sends those as a JSON file.
var rawID = 0x622
setInterval(
    function(){

        var rawData = generateRawData(rawID);
        var data = parseData.parseRaw(rawData);
        
        var id = data["ID"];
        console.log(id);
        if (id === 0x622) {
            io.emit('car-state-msg', data);
            console.log("car state message emitted");
        } else if (id === 0x623) {
            io.emit('battery-volt-msg', data);
            console.log("battery voltage message emitted");
        } else if (id === 0x624) {
            io.emit('battery-current-msg', data);
            console.log("battery current message emitted");
        } else if (id === 0x626) {
            io.emit('SOC-msg', data);
            console.log("battery charge message emitted");
        } else if (id === 0x627) {
            console.log("battery temperature message emitted")
            io.emit('battery-temp-msg', data);
        } else if (id === 0x401) {
            io.emit('error-msg', data);
            console.log("error message emitted");
        } else if (id === 0x402) {
            io.emit('bus-msg', data);
            console.log("bus message emitted");
        } else if (id === 0x403) {
            io.emit('velocity-msg', data);
            console.log("velocity message emitted");
        }

        if (rawID === 0x627) {
            rawID = 0x401;
        } else if (rawID === 0x403) {
            rawID = 0x622
        }

        rawID = rawID + 0x001;
    },
    1000
)


function generateRawData(id)
{
    var aveTemp = Math.floor(Math.random() * 100);
    var maxTemp = Math.floor(Math.random() * 100);
    var minTemp = Math.floor(Math.random() * 100);

    var rawData = 
    {
        "id": id,
        "data": [ (aveTemp & 0xFF), 0x00, (minTemp & 0xFF), 0x03, (maxTemp & 0xFF), 0x05, 0x06, 0x07],
        "len": 8,
        "timestamp": new Date().getTime() 
    }

    console.log("raw data generated");
    console.log(id);

    return rawData;

}



