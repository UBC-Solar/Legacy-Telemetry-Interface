//jshint esversion:8

const debug = require("debug")("app:")
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
app.use(express.static('public'))

app.use(bodyParser.json());

// Connect to MongoDB 
mongoose.connect("mongodb://localhost:27017/ubc-solar-telemetry-interface", {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => debug("Successfully connected to UBC Solar MongoDB"))
	.catch((err) => debug("Error connecting to database", err));

server.listen(port, () => {
    debug(`Server listening on port ${port}!`);
});

io.on('connection', (socket) => {
        io.emit('introduction');
        debug("socket connection initialized");
    }
);

app.post("/", async (req, res) => {
    res.on('error', (err) => {
            debug(err);
        }
    );

    message = new Message({
        id: req.body['id'],
        data: req.body['data'],
        timestamp: req.body['timestamp']
    });

    await message.save((err) => {
        if (err) {
            debug(err);
            res.status(400).send({message: "MESSAGE ERROR"});
        } else {
            res.status(200).send({message: "RECEIVED"});
        }
    });

    const data = parser.canParser(req.body);

    if (data['ID'] === 0x622) {
        io.emit('battery-faults', data);
    }
    else if (data['ID'] === 0x623) {
        io.emit('battery-voltage', data);
    }
    else if (data['ID'] === 0x624) {
        io.emit('battery-current', data);
    }
    else if (data['ID'] === 0x626) {
        io.emit('battery-soc', data);
    }
    else if (data['ID'] === 0x627) {
        io.emit('battery-temperature', data)
    }
    else if (data['ID'] === 0x401) {
        io.emit('motor-faults', data)
    }
    else if (data['ID'] === 0x402) {
        io.emit('motor-power', data);
    }
    else if (data['ID'] === 0x403) {
        io.emit('motor-velocity', data);
    }
    else if (data['ID'] === 0x40B) {
        io.emit('motor-temperature', data);
    }

    res.status(200).send({message: "Received"});
});

module.exports = app;
