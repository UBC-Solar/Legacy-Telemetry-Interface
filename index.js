var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var https = require('https');
var server = http.createServer(app);
var polyUtil = require('polyline-encoded');
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
    async function(socket)
    {
        io.emit('introduction');
        console.log("socket connection initialized");

        //UBC, Vancouver                                                         
        var ubc_lat = 49.2606                                                       
        var ubc_lng = -123.2460                                                     

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

function get_current_weather(lat, lng)
{

    key = "51bb626fa632bcac20ccb67a2809a73b";
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +
         "&lon=" + lng + "&exclude=minutely,daily" + "&appid=" + key;

    return new Promise( (resolve, reject) => {

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

                for (i=0; i<13; i=i+3) {
                   
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
                console.log("Error: " + err.message)
                reject(err.message);
            });
    });
}


function get_elevations(elevation_points_str, elevation_points)
{

    key = "AIzaSyCPgIT_5wtExgrIWN_Skl31yIg06XGtEHg";
    url = "https://maps.googleapis.com/maps/api/elevation/json?locations=" 
            + elevation_points_str + "&key=" + key;

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

                    for (i=0; i<response.length; i++){
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


function get_directions(origin_lat, origin_lng, dest_lat, dest_lng)
{
   
    key = "AIzaSyCPgIT_5wtExgrIWN_Skl31yIg06XGtEHg";
    url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin_lat + 
           "," + origin_lng + "&destination=" + dest_lat + "," + dest_lng + "&key=" + 
           key;

    return new Promise( (resolve, reject) => {

        https.get(url, (resp) => {

            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {

                response = JSON.parse(data);
         
                route_steps = response.routes[0].legs[0].steps
        
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

                for (i = 0; i < polyline_points.length; i=i+5) {
                    elevation_points.push(polyline_points[i]);
                    elevation_points_str = elevation_points_str.concat(polyline_points[i][0] + "," + polyline_points[i][1] + "|"); 
                }
                elevation_points_str = elevation_points_str.slice(0, elevation_points_str.length-1);

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
                else if (data['ID'] === 0x800)
                {
                    io.emit('current_coordinates', data);
                }

                response.statusCode = 200;
                response.end();

            }
        );
    }
).listen(8080);
