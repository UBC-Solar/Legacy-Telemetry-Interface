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

//Sends mock temperature data to the front end every 1s
//TODO: replace this with a function that listens for HTTP POST requests containing CAN messages in JSON,
//      parses it to its components and sends those as a JSON file.
setInterval(
    function(){
        var rawData = generateRawData();
        var data = parseData(rawData);
        io.emit('battery-temp-msg', data);
    },
    1000
)

function parseData(rawData)
{
    var data = {};

    if (rawData['id'] === 0x627)
    {
        var aveTemp = rawData['data'][0];
        var maxTemp = rawData['data'][4];
        var minTemp = rawData['data'][2];
        var timestamp = rawData['timestamp'];
    
        var data = 
        {
            "msg-id": 0x627,
            "msg-source": "bms",
            "timestamp": timestamp,
            "data": 
                {
                    "ave-batt-temp": aveTemp,
                    "max-batt-temp": maxTemp,
                    "min-batt-temp": minTemp,
                }
        }
        return data;
    }

}

function generateRawData()
{
    var aveTemp = Math.floor(Math.random() * 100);
    var maxTemp = Math.floor(Math.random() * 100);
    var minTemp = Math.floor(Math.random() * 100);

    var rawData = 
    {
        "id": 0x627,
        "data": [ (aveTemp & 0xFF), 0x00, (minTemp & 0xFF), 0x03, (maxTemp & 0xFF), 0x05, 0x06, 0x07],
        "len": 8,
        "timestamp": new Date().getTime() 
    }

    console.log("raw data generated");

    return rawData;

}



