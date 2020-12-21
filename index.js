//jshint esversion:8

const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const https = require('https');
const server = http.createServer(app);
const polyUtil = require('polyline-encoded');
const io = require('socket.io')(server);
const parser = require('./CAN_Parser/CANparse');
const port = process.env.PORT || 3000;
// const port2 = 80;
// const app2 = express();
// const server2 = http.createServer(app2)
// const io2 = require('socket.io')(server2); 

// ================================ from app.js
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const debug = require("debug")("app:");
const Message = require('./models/message');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

mongoose.connect("mongodb://localhost:27017/ubc-solar-telemetry-interface", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>{
        debug("Successfully connected to UBC Solar MongoDB");
        console.log("Data base connected");
    })
    .catch((err) => debug("Error connecting to database", err));
// ================================

server.listen(
    port,
    function () {
        console.log('server listening at port %d', port);
    }
);

// server2.listen(
//     port2,
//     function () {
//         console.log('server2 listening at port %d', port2);
//     }
// );

app.use(express.static(path.join(__dirname, '/client'))); 

// app2.use(express.static(path.join(__dirname, '/client')))

// ========================== from app.js
app.get('/history', (req, res) => {
    res.sendFile(__dirname + '/client/history.html');
});

app.post("/history", (req, res)=> {
    const dataName = req.body.dataName;
    const time = req.body.timeStamp;
    
    if (dataName === "All") {
        Message.find({timestamp: time}, (err, msgs) => {
            if (msgs == null || err) {
                debug("Error querying database", err);
                res.send("No data found :(" );
            } else {
                res.sendFile(__dirname + '/client/history.html');
                // msgs.forEach(msg => {
                //     const data = parser.canParser(msg);
                //     renderData(data);
                // });
                renderAll(msgs);
            }
        });
    } else {
        var data_id = parseDataID(dataName);
        Message.findOne({timestamp: time, id: data_id}, (err, msg) => {
            if (msg == null || err) {
                debug("Error querying database", err);
                res.send("No data found :(" );
            } else {
                console.log(msg);
                res.sendFile(__dirname + '/client/history.html');
                const data = parser.canParser(msg);
                console.log(data);
                renderData(data);
            }
        });
    }
});

app.post("/", async (req, res) => {
    res.on('error', (err) => {
        debug(err);
    });
    
    // check if the post request is a CAN message.
    // create mongoose Model
    message = new Message({
        id: req.body.id,
        data: req.body.data,
        timestamp: req.body.timestamp
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

    emitData(data);

    // res.status(200).send({
    //     message: "Received"
    // });
});

function emitData(data) {
    if (data.ID === 0x622) {
        io.emit('battery-faults', data);
    } else if (data.ID === 0x623) {
        io.emit('battery-voltage', data);
    } else if (data.ID === 0x624) {
        io.emit('battery-current', data);
    } else if (data.ID === 0x626) {
        io.emit('battery-soc', data);
    } else if (data.ID === 0x627) {
        io.emit('battery-temperature', data);
    } else if (data.ID === 0x401) {
        io.emit('motor-faults', data);
    } else if (data.ID === 0x402) {
        io.emit('motor-power', data);
    } else if (data.ID === 0x403) {
        io.emit('motor-velocity', data);
    } else if (data.ID === 0x40B) {
        io.emit('motor-temperature', data);
    } else if (data.ID === 0x800) {
        io.emit('current_coordinates', data);
    }
}

function renderData(data) {
    if (data.ID === 0x622) {
        io.emit('battery-faults-history', data);
    } else if (data.ID === 0x623) {
        io.emit('battery-voltage-history', data);
    } else if (data.ID === 0x624) {
        io.emit('battery-current-history', data);
    } else if (data.ID === 0x626) {
        io.emit('battery-soc-history', data);
    } else if (data.ID === 0x627) {
        io.emit('battery-temperature-history', data);
    } else if (data.ID === 0x401) {
        io.emit('motor-faults-history', data);
    } else if (data.ID === 0x402) {
        io.emit('motor-power-history', data);
    } else if (data.ID === 0x403) {
        io.emit('motor-velocity-history', data);
    } else if (data.ID === 0x40B) {
        io.emit('motor-temperature-history', data);
    } else if (data.ID === 0x800) {
        io.emit('current-coordinates-history', data);
    }
}

function renderAll(msgs) {
    msgs.forEach(msg => {
        const data = parser.canParser(msg);
        renderData(data);
        console.log("========");
    });
    io.emit("render-all");
    console.log("---------");
}

function parseDataID(dataName) {
    var data_id;
    if (dataName === "battery-faults") {
        data_id = 0x622;
    } else if (dataName === "battery-voltage") {
        data_id = 0x623;
    } else if (dataName === "battery-current") {
        data_id = 0x624;
    } else if (dataName === "battery-soc") {
        data_id = 0x626;
    } else if (dataName === "battery-temperature") {
        data_id = 0x627;
    } else if (dataName === "motor-faults") {
        data_id = 0x401;
    } else if (dataName === "motor-power") {
        data_id = 0x402;
    } else if (dataName === "motor-velocity") {
        data_id = 0x403;
    } else if (dataName === "motor-temperature") {
        data_id = 0x40B;
    }
    return data_id;
}

// ==========================

io.on(
    'connection',
    async function (socket) {
        io.emit('introduction');
        console.log("socket connection initialized");

        //UBC, Vancouver                                                         
        var ubc_lat = 49.2606;
        var ubc_lng = -123.2460;

        //University of Waterloo, Waterloo                                       
        var uwaterloo_lat = 43.4723;
        var uwaterloo_lng = -80.5449;

        //SFU, Burnaby                                                           
        var sfu_lat = 49.278889;
        var sfu_lng = -122.916111;

        result = await get_directions(ubc_lat, ubc_lng, sfu_lat, sfu_lng);
        elevation_points_str = result[0];
        elevation_points = result[1];

        result = await get_elevations(elevation_points_str, elevation_points);

        result = await get_current_weather(ubc_lat, ubc_lng);

    }
);

function get_current_weather(lat, lng) {

    key = "51bb626fa632bcac20ccb67a2809a73b";
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +
        "&lon=" + lng + "&exclude=minutely,daily" + "&appid=" + key;

    return new Promise((resolve, reject) => {

        https.get(url, (resp) => {

            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {

                response = JSON.parse(data);

                current_time = response.current.dt;
                sunrise_unix = response.current.sunrise;
                sunset_unix = response.current.sunset;

                temp_fc = [];
                cloud_cover_fc = [];
                wind_speed_fc = [];
                wind_dir_fc = [];
                desc_fc = [];

                for (i = 0; i < 13; i = i + 3) {

                    temp_fc.push(response.hourly[i].temp - 273.15);
                    cloud_cover_fc.push(response.hourly[i].clouds);
                    wind_speed_fc.push(response.hourly[i].wind_speed);
                    wind_dir_fc.push(response.hourly[i].wind_deg);
                    desc_fc.push(response.hourly[i].weather[0].description);

                }

                data = {};
                data['update_time'] = current_time;
                data['sunrise_time'] = sunrise_unix;
                data['sunset_time'] = sunset_unix;
                data['temperature'] = temp_fc;
                data['cloud_cover'] = cloud_cover_fc;
                data['wind_speed'] = wind_speed_fc;
                data['wind_direction'] = wind_dir_fc;
                data['description'] = desc_fc;

                io.emit('weather-forecast', data);

                resolve(data);

            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err.message);
        });
    });
}


function get_elevations(elevation_points_str, elevation_points) {

    key = "AIzaSyCPgIT_5wtExgrIWN_Skl31yIg06XGtEHg";
    url = "https://maps.googleapis.com/maps/api/elevation/json?locations=" +
        elevation_points_str + "&key=" + key;

    return new Promise(
        (resolve, reject) => {

            https.get(url, (resp) => {

                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {

                    response = JSON.parse(data).results;

                    elevations = [];

                    for (i = 0; i < response.length; i++) {
                        elevations.push(response[i].elevation);
                    }

                    data = {};
                    data['elevation_points'] = elevation_points;
                    data['elevations'] = elevations;

                    io.emit('elevations', data);

                    resolve(data);

                });

            }).on("error", (err) => {
                console.log("Error: " + err.message)
                reject(err.message);
            });
        });
}


function get_directions(origin_lat, origin_lng, dest_lat, dest_lng) {

    key = "AIzaSyCPgIT_5wtExgrIWN_Skl31yIg06XGtEHg";
    url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin_lat +
        "," + origin_lng + "&destination=" + dest_lat + "," + dest_lng + "&key=" +
        key;

    return new Promise((resolve, reject) => {

        https.get(url, (resp) => {

            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {

                response = JSON.parse(data);

                route_steps = response.routes[0].legs[0].steps;

                route_instructions = [];
                polyline_points = [];
                elevation_points = [];
                elevation_points_str = '';

                for (i = 0; i < route_steps.length; i++) {

                    route_instructions.push(route_steps[i].html_instructions);
                    polyline_raw = route_steps[i].polyline.points;
                    temp = polyUtil.decode(polyline_raw);

                    polyline_points.push(temp[0]);
                    for (j = 0; j < temp.length; j = j + 5) {
                        polyline_points.push(temp[j]);
                    }
                    polyline_points.push(temp[temp.length - 1]);

                }

                for (i = 0; i < polyline_points.length; i = i + 5) {
                    elevation_points.push(polyline_points[i]);
                    elevation_points_str = elevation_points_str.concat(polyline_points[i][0] + "," + polyline_points[i][1] + "|");
                }
                elevation_points_str = elevation_points_str.slice(0, elevation_points_str.length - 1);

                data = {};
                data['points'] = polyline_points;

                io.emit('path-directions', data);

                resolve([elevation_points_str, elevation_points]);

            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(data);
        });

    });
}

http.createServer(
    (request, response) => {
        console.log("Index Server Running!!");
        const {
            headers,
            method,
            url
        } = request;
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

                emitData(data);
                response.statusCode = 200;
                response.end();
            }
        );
    }
).listen(8080);
