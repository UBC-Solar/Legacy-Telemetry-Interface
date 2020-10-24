window.onload = function () {
    const $ = document.getElementById.bind(document);
    var serverStatus = $('server-status');
    var lastTimestamp = $('last-timestamp');
    var lastID = $('last-id');

    var battVoltage = $('batt-voltage');
    var battMinCellVoltage = $('batt-min-cell-voltage');
    var battMaxCellVoltage = $('batt-max-cell-voltage');
    var battCurrent = $('batt-current');
    var battMaxTemp = $('batt-max-temp');
    var battMinTemp = $('batt-min-temp');
    var battAveTemp = $('batt-ave-temp');
    var battSOC = $('batt-soc');

    var motorVelocity = $('motor-velocity');
    var motorTemp = $('motor-temp');
    var mcTemp = $('mc-temp');
    var motorCurrent = $('motor-current');
    var motorVoltage = $('motor-voltage');

    var batteryLow = $('battery-low');
    var batteryFull = $('battery-full');
    var batteryCommFault = $('comm-fault');

    var chargeOC = $('chg-overcurrent');
    var dischargeOC = $('dchg-overcurrent');
    var overTemp = $('overtemp');

    var undervoltage = $('undervoltage');
    var overvoltage = $('overvoltage');
    var generalFault = $('general-fault');

    var relayFault = $('relay-fault');
    var k3Contactor = $('k3-contactor');
    var k2Contactor = $('k2-contactor');
    var k1Contactor = $('k1-contactor');
    var faultState = $('fault-state');

    var fanOn = $('fan-on');
    var llimSet = $('llim-set');
    var hlimSet = $('hlim-set');
    var canContactor = $('can-contactor');
    var hardwireContactor = $('hardwire-contactor');
    var interlockTripped = $('interlock-tripped');
    var loadPower = $('load-power');
    var sourcePower = $('source-power');

    var isolationFault = $('isolation-fault');
    var lowSOH = $('low-soh');
    var hotTemp = $('hot-temp');
    var coldTemp = $('cold-temp');
    var highVoltage = $('high-voltage');
    var lowVoltage = $('low-voltage');

    var voltageLockout = $('voltage-lockout');
    var configError = $('config-error');
    var watchdogReset = $('watchdog-reset');
    var dcOV = $('dc-overvoltage');
    var softwareOC = $('software-overcurrent');
    var hardwareOC = $('hardware-overcurrent');

    var tempCtx = $('tempChart').getContext('2d');
    var vAndACtx = $('vAndAChart').getContext('2d');
    var elevationCtx = $('elevationChart').getContext('2d');

    var current_time = $('current_time');

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
            
            if (data['relayFault'] === 1)
            {
                relayFault.style.color = "red";
            }
            else
            {
                relayFault.style.color = "green";
            }

            if (data['K3'] === 1)
            {
                k3Contactor.style.color = "red";
            }
            else
            {
                k3Contactor.style.color = "green";
            }

            if (data['K2'] === 1)
            {
                k2Contactor.style.color = "red";
            }
            else
            {
                k2Contactor.style.color = "green";
            }

            if (data['K1'] === 1)
            {
                k1Contactor.style.color = "red";
            }
            else
            {
                k1Contactor.style.color = "green";
            }

            if (data['faultState'] === 1)
            {
                faultState.style.color = "red";
                generalFault.style.color = "red";
            }
            else
            {
                faultState.style.color = "green";
                generalFault.style.color = "green";
            }

            if (data['fanOn'] === 1)
            {
                fanOn.style.color = "red";
            }
            else
            {
                fanOn.style.color = "green";
            }

            if (data['LLIM'] === 1)
            {
                llimSet.style.color = "red";
            }
            else
            {
                llimSet.style.color = "green";
            }

            if (data['HLIM'] === 1)
            {
                hlimSet.style.color = "red";
            }
            else
            {
                hlimSet.style.color = "green";
            }

            if (data['CANrequest'] === 1)
            {
                canContactor.style.color = "red";
            }
            else
            {
                canContactor.style.color = "green";
            }

            if (data['HARDWIRErequest'] === 1)
            {
                hardwireContactor.style.color = "red";
            }
            else
            {
                hardwireContactor.style.color = "green";
            }

            if (data['interlock'] === 1)
            {
                interlockTripped.style.color = "red";
            }
            else
            {
                interlockTripped.style.color = "green";
            }

            if (data['powerLoad'] === 1)
            {
                loadPower.style.color = "red";
            }
            else
            {
                loadPower.style.color = "green";
            }
            if (data['powerSource'] === 1)
            {
                sourcePower.style.color = "red";
            }
            else
            {
                sourcePower.style.color = "green";
            }

            if (data['overVoltage'] === 1)
            {
                overvoltage.style.color = "red";
            }
            else
            {
                overvoltage.style.color = "green";
            }

            if (data['underVoltage'] === 1)
            {
                undervoltage.style.color = "red";
            }
            else
            {
                undervoltage.style.color = "green";
            }

            if (data['overTemperature'] === 1)
            {
                overTemp.style.color = "red";
            }
            else
            {
                overTemp.style.color = "green";
            }

            if (data['chargeOvercurrent'] === 1)
            {
                chargeOC.style.color = "red";
            }
            else
            {
                chargeOC.style.color = "green";
            }

            if (data['dischargeOverCurrent'] === 1)
            {
                dischargeOC.style.color = "red";
            }
            else
            {
                dischargeOC.style.color = "green";
            }

            if (data['commFault'] === 1)
            {
                batteryCommFault.style.color = "red";
            }
            else
            {
                batteryCommFault.style.color = "green";
            }

            if (data['interlockTrip'] === 1)
            {
                interlockTripped.style.color = "red";
            }
            else
            {
                interlockTripped.style.color = "green";
            }

            if (data['isoFault'] === 1)
            {
                isolationFault.style.color = "red";
            }
            else
            {
                isolationFault.style.color = "green";
            }

            if (data['lowSOH'] === 1)
            {
                lowSOH.style.color = "red";
            }
            else
            {
                lowSOH.style.color = "green";
            }

            if (data['dischargeOC'] === 1)
            {
                dischargeOC.style.color = "red";
            }
            else
            {
                dischargeOC.style.color = "green";
            }

            if (data['chargeOC'] === 1)
            {
                chargeOC.style.color = "red";
            }
            else
            {
                chargeOC.style.color = "green";
            }

            if (data['hotTemp'] === 1)
            {
                hotTemp.style.color = "red";
            }
            else
            {
                hotTemp.style.color = "green";
            }

            if (data['coldTemp'] === 1)
            {
                coldTemp.style.color = "red";
            }
            else
            {
                coldTemp.style.color = "green";
            }

            if (data['highVolt'] === 1)
            {
                highVoltage.style.color = "red";
                batteryFull.style.color = "red";
            }
            else
            {
                highVoltage.style.color = "green";
                batteryFull.style.color = "green"
            }

            if (data['lowVolt'] === 1)
            {
                lowVoltage.style.color = "red";
                batteryLow.style.color = "red"
            }
            else
            {
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
            
            if (data['voltageLockOut'] === 1)
            {
                voltageLockout.style.color = "red";
            }
            else
            {
                voltageLockout.style.color = "green";
            }

            if (data['configError'] === 1)
            {
                configError.style.color = "red";
            }
            else
            {
                configError.style.color = "green";
            }

            if (data['watchdogReset'] === 1)
            {
                watchdogReset.style.color = "red";
            }
            else
            {
                watchdogReset.style.color = "green";
            }

            if (data['DCOverVoltage'] === 1)
            {
                dcOV.style.color = "red";
            }
            else
            {
                dcOV.style.color = "green";
            }

            if (data['softwareOverCurrent'] === 1)
            {
                softwareOC.style.color = "red";
            }
            else
            {
                softwareOC.style.color = "green";
            }

            if (data['hardwareOverCurrent'] === 1)
            {
                hardwareOC.style.color = "red";
            }
            else
            {
                hardwareOC.style.color = "green";
            }
        }
    );

    socket.on(
        'motor-power',
        function(data) {
            
            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            motorCurrent.innerHTML = data['busCurrent'];
            motorVoltage.innerHTML = data['busVoltage'];
        }
    );

    socket.on(
        'motor-temperature',
        function(data) {
            
            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            motorTemp.innerHTML = data['motorTemp'];
            mcTemp.innerHTML = data['motorControllerTemp'];
            
        }
    );

    socket.on(
        'motor-velocity',
        function(data) {
            lastTimestamp.innerHTML = data['timeStamp'];
            lastID.innerHTML = "0x".concat(data['ID'].toString(16));
            motorVelocity.innerHTML = data['velocity'];
        }
    );

    socket.on(
        'current_coordinates',
        function(data) {
            place_marker(data['currentLatitude'], data['currentLongitude']);
        }
    );

    socket.on(
        'path-directions',
        function(data) {

            for (i = 0; i < data['points'].length; i++) {
                place_breadcrumb(data['points'][i][0], data['points'][i][1]);
            } 

        }
    );

    socket.on(
        'elevations',
        function(data) {
            //console.log("elevation data received");
            updateElevationChart(data['elevations']);
        }
    );

    socket.on(
        'weather-forecast',
        function(data) {

            current_time.innerHTML = dateFormat(data['update_time']);
            sunrise_time.innerHTML = dateFormat(data['sunrise_time']);
            sunset_time.innerHTML = dateFormat(data['sunset_time']);
        
            fc_temp_0.innerHTML = Math.round(data['temperature'][0] * 100)/100;
            fc_temp_3.innerHTML = Math.round(data['temperature'][1] * 100)/100;
            fc_temp_6.innerHTML = Math.round(data['temperature'][2] * 100)/100;

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
        for (i=0; i<elevations.length; i++) {
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
            return {data, timeStamp, valid};
        }

        return {data, timeStamp, valid};
    }


    /*
        TEMPORARY: Randomized Chart Data
        TODO: Replace this
    */

    var tempTimeCount = 0;

    setInterval(function() {
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


}


