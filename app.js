//jshint esversion:8

const debug = require("debug")("app:");
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Message = require('./models/message');
const parser = require('./CAN_Parser/CANparse');

const port = process.env.PORT || 3000;

// serve static files
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static('public'));

app.use(bodyParser.json());

// Connect to MongoDB 
mongoose.connect("mongodb://localhost:27017/ubc-solar-telemetry-interface", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>{
        debug("Successfully connected to UBC Solar MongoDB");
        console.log("Data base connected");
    })
    .catch((err) => debug("Error connecting to database", err));

server.listen(port, () => {
    debug(`Server listening on port ${port}!`);
});

io.on('connection', (socket) => {
    io.emit('introduction');
    debug("socket connection initialized");
});

// app.get('/bmicalculator', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.post("/", async (req, res) => {
    res.on('error', (err) => {
        debug(err);
    });

    var newData = req.body['data'];

    // check if the post request is a CAN message.
    // create mongoose Model
    message = new Message({
        id: req.body['id'],
        data: newData,
        timestamp: req.body['timestamp']
    });

    // save 'message' in the data base
    await message.save((err) => {
        if (err) {
            debug(err);
            res.status(400).send({
                message: "MESSAGE ERROR"
            });
        } else {
            res.status(200).send({
                message: "RECEIVED"
            });
        }
    });

    const data = parser.canParser(req.body);

    if (data['ID'] === 0x622) {
        io.emit('battery-faults', data);
    } else if (data['ID'] === 0x623) {
        io.emit('battery-voltage', data);
    } else if (data['ID'] === 0x624) {
        io.emit('battery-current', data);
    } else if (data['ID'] === 0x626) {
        io.emit('battery-soc', data);
    } else if (data['ID'] === 0x627) {
        io.emit('battery-temperature', data);
    } else if (data['ID'] === 0x401) {
        io.emit('motor-faults', data);
    } else if (data['ID'] === 0x402) {
        io.emit('motor-power', data);
    } else if (data['ID'] === 0x403) {
        io.emit('motor-velocity', data);
    } else if (data['ID'] === 0x40B) {
        io.emit('motor-temperature', data);
    }

    res.status(200).send({
        message: "Received"
    });
});


// Handling post request made by form
app.post('/history', (req, res) => {
    res.on('error', (err) => {
        debug(err);
    });
    // extract data with req.body['id'] etc.

    const dataName = req.body['data-name'];
    const timeStamp = req.body['time-stamp'];
    var targetID;
    if (dataName == "battery-faults") targetID = 0x622;
    else if (dataName == "battery-voltage") targetID = 0x623;
    else if (dataName == "battery-current") targetID = 0x624;
    else if (dataName == "battery-soc") targetID = 0x626;
    else if (dataName == "battery-temperature") targetID = 0x627;
    else if (dataName == "motor-faults") targetID = 0x401;
    else if (dataName == "motor-power") targetID = 0x402;
    else if (dataName == "motor-velocity") targetID = 0x403;
    else if (dataName == "motor-temperature") targetID = 0x40B;

    Message.find({
        id: targetID,
        timeStamp: {
            $eq: timeStamp
        }
    }, (err, doc) => {
        if (err) debug(err);
        else {
            let data = parser.canParser(doc);
            if (data['ID'] === 0x622) {
                io.emit('battery-faults-history', data);
            } else if (data['ID'] === 0x623) {
                io.emit('battery-voltage-history', data);
            } else if (data['ID'] === 0x624) {
                io.emit('battery-current-history', data);
            } else if (data['ID'] === 0x626) {
                io.emit('battery-soc-history', data);
            } else if (data['ID'] === 0x627) {
                io.emit('battery-temperature-history', data);
            } else if (data['ID'] === 0x401) {
                io.emit('motor-faults-history', data);
            } else if (data['ID'] === 0x402) {
                io.emit('motor-power-history', data);
            } else if (data['ID'] === 0x403) {
                io.emit('motor-velocity-history', data);
            } else if (data['ID'] === 0x40B) {
                io.emit('motor-temperature-history', data);
            }

        }
    });

    // fetch data from database
    // emit event and update the DOM

});

app.get('/history', (req, res) => {
    console.log("get history");
});

module.exports = app;