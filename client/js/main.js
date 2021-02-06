//jshint esversion:6

window.onload = function () {
    const $ = document.getElementById.bind(document);
    const serverStatus = $('server-status');
    const lastTimestamp = $('last-timestamp');
    const lastID = $('last-id');

    const battVoltage = $('batt-voltage');
    const battMinCellVoltage = $('batt-min-cell-voltage');
    const battMaxCellVoltage = $('batt-max-cell-voltage');
    const battCurrent = $('batt-current');
    const battMaxTemp = $('batt-max-temp');
    const battMinTemp = $('batt-min-temp');
    const battAveTemp = $('batt-ave-temp');
    const battSOC = $('batt-soc');

    const motorVelocity = $('motor-velocity');
    const motorTemp = $('motor-temp');
    const mcTemp = $('mc-temp');
    const motorCurrent = $('motor-current');
    const motorVoltage = $('motor-voltage');

    const batteryLow = $('battery-low');
    const batteryFull = $('battery-full');
    const batteryCommFault = $('comm-fault');
    const chargeOC = $('chg-overcurrent');
    const dischargeOC = $('dchg-overcurrent');
    const overTemp = $('overtemp');

    const undervoltage = $('undervoltage');
    const overvoltage = $('overvoltage');
    const generalFault = $('general-fault');

    const relayFault = $('relay-fault');
    const k3Contactor = $('k3-contactor');
    const k2Contactor = $('k2-contactor');
    const k1Contactor = $('k1-contactor');
    const faultState = $('fault-state');

    const fanOn = $('fan-on');
    const llimSet = $('llim-set');
    const hlimSet = $('hlim-set');
    const canContactor = $('can-contactor');
    const hardwireContactor = $('hardwire-contactor');
    const interlockTripped = $('interlock-tripped');
    const loadPower = $('load-power');
    const sourcePower = $('source-power');

    const isolationFault = $('isolation-fault');
    const lowSOH = $('low-soh');
    const hotTemp = $('hot-temp');
    const coldTemp = $('cold-temp');
    const highVoltage = $('high-voltage');
    const lowVoltage = $('low-voltage');

    const voltageLockout = $('voltage-lockout');
    const configError = $('config-error');
    const watchdogReset = $('watchdog-reset');
    const dcOV = $('dc-overvoltage');
    const softwareOC = $('software-overcurrent');
    const hardwareOC = $('hardware-overcurrent');

    const tempCtx = $('tempChart').getContext('2d');
    const vAndACtx = $('vAndAChart').getContext('2d');
    const elevationCtx = $('elevationChart').getContext('2d');

    const current_time = $('current-time');
    const sunrise_time = $('sunrise-time');
    const sunset_time = $('sunset-time');

    const fc_temp_0 = $('temp-0');
    const fc_temp_3 = $('temp-3');
    const fc_temp_6 = $('temp-6');

    const fc_cloud_0 = $('cloud-0');
    const fc_cloud_3 = $('cloud-3');
    const fc_cloud_6 = $('cloud-6');

    const fc_wind_0 = $('wind-0');
    const fc_wind_3 = $('wind-3');
    const fc_wind_6 = $('wind-6');

    const fc_desc_0 = $('desc-0');
    const fc_desc_3 = $('desc-3');
    const fc_desc_6 = $('desc-6');


    // var mapTab = $('map-tab');

    var elevationChart = new Chart(elevationCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Elevation in Metres(m)',
                data: [],
                fill: false,
                yAxisID: 'elevation-axis',
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    id: 'elevation-axis',
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: 500,
                        stepSize: 25,
                    }
                }]
            }
        }
    });

    var tempChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature in Celsius',
                data: [],
                fill: false,
                yAxisID: 'temp-axis',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    id: 'temp-axis',
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 10,
                    }
                }]
            }
        }


    });

    var vAndAChart = new Chart(vAndACtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Voltage in V',
                data: [],
                fill: false,
                yAxisID: 'left-y-axis',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(246, 71, 71, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Current in A',
                data: [],
                fill: false,
                yAxisID: 'right-y-axis',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(44, 130, 201, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    id: 'left-y-axis',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 120,
                        stepSize: 10,
                    }
                }, {
                    id: 'right-y-axis',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        min: 0,
                        max: 60,
                        stepSize: 5
                    }
                }]
            }
        }
    });

    /*
        Initialize socket.io link between client and back end
    */

    var socket = io();


    socket.on(
        'introduction',
        function (data) {
            serverStatus.innerHTML = "Connected";
            serverStatus.style.color = "green";
        }
    );

    socket.on(
        'battery-temperature',
        function (data) {

            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            battMaxTemp.innerHTML = data['maxTemp'];
            battMinTemp.innerHTML = data['minTemp'];
            battAveTemp.innerHTML = data['temperature'];

            let chartData = getData(data['temperature'], data['timeStamp']);

            if (chartData.valid) {
                updateChart(tempChart, chartData.data, chartData.timeStamp, 0);
            }

        }

    );

    socket.on(
        'battery-faults',
        function (data) {

            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));

            if (data['relayFault'] === 1) {
                relayFault.style.color = "red";
            } else {
                relayFault.style.color = "green";
            }

            if (data['K3'] === 1) {
                k3Contactor.style.color = "red";
            } else {
                k3Contactor.style.color = "green";
            }

            if (data['K2'] === 1) {
                k2Contactor.style.color = "red";
            } else {
                k2Contactor.style.color = "green";
            }

            if (data['K1'] === 1) {
                k1Contactor.style.color = "red";
            } else {
                k1Contactor.style.color = "green";
            }

            if (data['faultState'] === 1) {
                faultState.style.color = "red";
                generalFault.style.color = "red";
            } else {
                faultState.style.color = "green";
                generalFault.style.color = "green";
            }

            if (data['fanOn'] === 1) {
                fanOn.style.color = "red";
            } else {
                fanOn.style.color = "green";
            }

            if (data['LLIM'] === 1) {
                llimSet.style.color = "red";
            } else {
                llimSet.style.color = "green";
            }

            if (data['HLIM'] === 1) {
                hlimSet.style.color = "red";
            } else {
                hlimSet.style.color = "green";
            }

            if (data['CANrequest'] === 1) {
                canContactor.style.color = "red";
            } else {
                canContactor.style.color = "green";
            }

            if (data['HARDWIRErequest'] === 1) {
                hardwireContactor.style.color = "red";
            } else {
                hardwireContactor.style.color = "green";
            }

            if (data['interlock'] === 1) {
                interlockTripped.style.color = "red";
            } else {
                interlockTripped.style.color = "green";
            }

            if (data['powerLoad'] === 1) {
                loadPower.style.color = "red";
            } else {
                loadPower.style.color = "green";
            }
            if (data['powerSource'] === 1) {
                sourcePower.style.color = "red";
            } else {
                sourcePower.style.color = "green";
            }

            if (data['overVoltage'] === 1) {
                overvoltage.style.color = "red";
            } else {
                overvoltage.style.color = "green";
            }

            if (data['underVoltage'] === 1) {
                undervoltage.style.color = "red";
            } else {
                undervoltage.style.color = "green";
            }

            if (data['overTemperature'] === 1) {
                overTemp.style.color = "red";
            } else {
                overTemp.style.color = "green";
            }

            if (data['chargeOvercurrent'] === 1) {
                chargeOC.style.color = "red";
            } else {
                chargeOC.style.color = "green";
            }

            if (data['dischargeOverCurrent'] === 1) {
                dischargeOC.style.color = "red";
            } else {
                dischargeOC.style.color = "green";
            }

            if (data['commFault'] === 1) {
                batteryCommFault.style.color = "red";
            } else {
                batteryCommFault.style.color = "green";
            }

            if (data['interlockTrip'] === 1) {
                interlockTripped.style.color = "red";
            } else {
                interlockTripped.style.color = "green";
            }

            if (data['isoFault'] === 1) {
                isolationFault.style.color = "red";
            } else {
                isolationFault.style.color = "green";
            }

            if (data['lowSOH'] === 1) {
                lowSOH.style.color = "red";
            } else {
                lowSOH.style.color = "green";
            }

            if (data['dischargeOC'] === 1) {
                dischargeOC.style.color = "red";
            } else {
                dischargeOC.style.color = "green";
            }

            if (data['chargeOC'] === 1) {
                chargeOC.style.color = "red";
            } else {
                chargeOC.style.color = "green";
            }

            if (data['hotTemp'] === 1) {
                hotTemp.style.color = "red";
            } else {
                hotTemp.style.color = "green";
            }

            if (data['coldTemp'] === 1) {
                coldTemp.style.color = "red";
            } else {
                coldTemp.style.color = "green";
            }

            if (data['highVolt'] === 1) {
                highVoltage.style.color = "red";
                batteryFull.style.color = "red";
            } else {
                highVoltage.style.color = "green";
                batteryFull.style.color = "green"
            }

            if (data['lowVolt'] === 1) {
                lowVoltage.style.color = "red";
                batteryLow.style.color = "red"
            } else {
                lowVoltage.style.color = "green";
                batteryLow.style.color = "green";
            }

        }
    );

    socket.on(
        'battery-voltage',
        function (data) {

            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            battVoltage.innerHTML = data['packVoltage'];
            battMaxCellVoltage.innerHTML = data['maxVoltage'];
            battMinCellVoltage.innerHTML = data['minVoltage'];

            let chartData = getData(data['packVoltage'], data['timeStamp']);

            if (chartData.valid) {
                updateChart(vAndAChart, chartData.data, chartData.timeStamp, 0);
            }
        }
    );

    socket.on(
        'battery-current',
        function (data) {

            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            battCurrent.innerHTML = data['current'];

            let chartData = getData(data['current'], data['timeStamp']);

            if (chartData.valid) {
                updateChartNoX(vAndAChart, chartData.data, 1);
            }
        }
    );

    socket.on(
        'battery-soc',
        function (data) {

            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            battSOC.innerHTML = data['stateOfCharge'];

        }
    );

    socket.on(
        'motor-faults',
        function (data) {

            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));

            if (data['voltageLockOut'] === 1) {
                voltageLockout.style.color = "red";
            } else {
                voltageLockout.style.color = "green";
            }

            if (data['configError'] === 1) {
                configError.style.color = "red";
            } else {
                configError.style.color = "green";
            }

            if (data['watchdogReset'] === 1) {
                watchdogReset.style.color = "red";
            } else {
                watchdogReset.style.color = "green";
            }

            if (data['DCOverVoltage'] === 1) {
                dcOV.style.color = "red";
            } else {
                dcOV.style.color = "green";
            }

            if (data['softwareOverCurrent'] === 1) {
                softwareOC.style.color = "red";
            } else {
                softwareOC.style.color = "green";
            }

            if (data['hardwareOverCurrent'] === 1) {
                hardwareOC.style.color = "red";
            } else {
                hardwareOC.style.color = "green";
            }
        }
    );

    socket.on(
        'motor-power',
        function (data) {

            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            motorCurrent.innerHTML = data['busCurrent'];
            motorVoltage.innerHTML = data['busVoltage'];
        }
    );

    socket.on(
        'motor-temperature',
        function (data) {

            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            motorTemp.innerHTML = data['motorTemp'];
            mcTemp.innerHTML = data['motorControllerTemp'];

        }
    );

    socket.on(
        'motor-velocity',
        function (data) {
            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            motorVelocity.innerHTML = data['velocity'];
        }
    );

    socket.on(
        'current_coordinates',
        function (data) {
            place_marker(data['currentLatitude'], data['currentLongitude']);
        }
    );

    socket.on(
        'path-directions',
        function (data) {

            for (i = 0; i < data['points'].length; i++) {
                place_breadcrumb(data['points'][i][0], data['points'][i][1]);
            }

        }
    );

    socket.on(
        'elevations',
        function (data) {
            //console.log("elevation data received");
            updateElevationChart(data['elevations']);
        }
    );

    function timer() {
        var d = new Date();
        var t = d.toLocaleTimeString();
        current_time.innerHTML = t;
    }

    setInterval(timer, 1000);

    socket.on(
        'weather-forecast',
        function (data) {

            // current_time.innerHTML = setInterval( dateFormat(data['update_time']), 1000);
            
            sunrise_time.innerHTML = dateFormat(data['sunrise_time']);
            sunset_time.innerHTML = dateFormat(data['sunset_time']);

            fc_temp_0.innerHTML = Math.round(data['temperature'][0] * 100) / 100;
            fc_temp_3.innerHTML = Math.round(data['temperature'][1] * 100) / 100;
            fc_temp_6.innerHTML = Math.round(data['temperature'][2] * 100) / 100;

            fc_cloud_0.innerHTML = data['cloud_cover'][0];
            fc_cloud_3.innerHTML = data['cloud_cover'][1];
            fc_cloud_6.innerHTML = data['cloud_cover'][2];

            fc_wind_0.innerHTML = data['wind_speed'][0] + " , " + data['wind_direction'][0];
            fc_wind_3.innerHTML = data['wind_speed'][1] + " , " + data['wind_direction'][1];
            fc_wind_6.innerHTML = data['wind_speed'][2] + " , " + data['wind_direction'][2];

            fc_desc_0.innerHTML = data['description'][0];
            fc_desc_3.innerHTML = data['description'][1];
            fc_desc_6.innerHTML = data['description'][2];

        }
    )

    /*
        Miscellaneous functions
    */

    function dateFormat(unix_time) {


        var date = new Date(unix_time * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;

    }

    /*
        Functions for handling charts
    */

    function updateElevationChart(elevations) {
        for (i = 0; i < elevations.length; i++) {
            elevationChart.data.labels.push(i);
            elevationChart.data.datasets[0].data.push(elevations[i]);
        }

        elevationChart.update();
    }

    function updateChart(chart, data, timeStamp, dataSet) {
        let sizeLabels = chart.data.labels.push(timeStamp);
        let sizeData = chart.data.datasets[dataSet].data.push(data);

        if (sizeLabels > 10) {
            chart.data.labels.shift();
        }
        if (sizeData > 10) {
            chart.data.datasets[dataSet].data.shift();
        }

        chart.update();
    }

    function updateChartNoX(chart, data, dataSet) {
        let sizeData = chart.data.datasets[dataSet].data.push(data);

        if (sizeData > 10) {
            chart.data.datasets[dataSet].data.shift();
        }

        chart.update();
    }

    function getData(data, timeStamp) {
        let roundedTime = Math.round(parseFloat(timeStamp));
        let timeDiff = Math.abs(parseFloat(timeStamp) - roundedTime);
        let valid = false;

        if (timeDiff < 0.005) {
            valid = true;
            return {
                data,
                timeStamp,
                valid
            };
        }

        return {
            data,
            timeStamp,
            valid
        };
    }


    /*
        TEMPORARY: Randomized Chart Data
        TODO: Replace this
    */

    var tempTimeCount = 0;

    setInterval(function () {
        let data = Math.floor(Math.random() * 100) + 1;
        let chartData = getData(data, tempTimeCount);

        if (chartData.valid) {
            updateChart(tempChart, chartData.data, chartData.timeStamp, 0);
        }

        let data2 = Math.floor(Math.random() * 120) + 1;
        let chartData2 = getData(data2, tempTimeCount);

        if (chartData2.valid) {
            updateChart(vAndAChart, chartData2.data, chartData2.timeStamp, 0);
        }

        let data3 = Math.floor(Math.random() * 60) + 1;
        let chartData3 = getData(data3, tempTimeCount);

        if (chartData3.valid) {
            updateChartNoX(vAndAChart, chartData3.data, 1);
        }

        tempTimeCount += 0.5;
    }, 500);

    // ==========================================================================

    socket.on("render-all", () => {
        localStorage.setItem("ID", "all");
    });

    socket.on('battery-faults-history', (data) => {
        console.log(data);
        localStorage.setItem("ID", JSON.stringify(data.ID));  
        localStorage.setItem("battery-faults-history", JSON.stringify(data));
    });

    socket.on('battery-voltage-history', (data) => {
        console.log(data);
        localStorage.setItem("ID", data.ID);
        localStorage.setItem('battery-voltage-history', JSON.stringify(data));
    });

    socket.on('battery-current-history', (data) => {
        localStorage.setItem("ID", JSON.stringify(data.ID));
        localStorage.setItem("battery-current-history", JSON.stringify(data));
    });

    socket.on('battery-soc-history', (data) => {
        console.log(data);
        localStorage.setItem("ID", data.ID);
        localStorage.setItem('battery-soc-history', JSON.stringify(data));
    });

    socket.on('battery-temperature-history', (data) => {
        console.log(data);
        localStorage.setItem("ID", data.ID);
        localStorage.setItem('battery-temperature-history', JSON.stringify(data));
    });

    socket.on('motor-faults-history', (data) => {
        console.log(data);
        localStorage.setItem("ID", data.ID);
        localStorage.setItem('motor-faults-history', JSON.stringify(data));
    });


    socket.on('motor-power-history', (data) => {
        console.log(data);
        localStorage.setItem("ID", data.ID);
        localStorage.setItem('motor-power-history', JSON.stringify(data));
    });

    socket.on('motor-velocity-history', (data) => {
        console.log(data);
        localStorage.setItem("ID", data.ID);
        localStorage.setItem('motor-velocity-history', JSON.stringify(data));
    });

    socket.on('motor-temperature-history', (data) => {
        console.log(data);
        localStorage.setItem("ID", data.ID);
        localStorage.setItem('motor-temperature-history', JSON.stringify(data));
    });

    socket.on('current-coordinates-history', (data) => {
        console.log(data);
        localStorage.setItem("ID", data.ID);
        localStorage.setItem('current-coordinates-history', JSON.stringify(data));
    });


}