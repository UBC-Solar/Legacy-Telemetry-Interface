
window.onload = function () {
    var serverStatus = document.getElementById('server-status');
    var lastTimestamp = document.getElementById('last-timestamp');
    var lastID = document.getElementById('last-id');

    var battVoltage = document.getElementById('batt-voltage');
    var battMinCellVoltage = document.getElementById('batt-min-cell-voltage');
    var battMaxCellVoltage = document.getElementById('batt-max-cell-voltage');
    var battCurrent = document.getElementById('batt-current');
    var battMaxTemp = document.getElementById('batt-max-temp');
    var battMinTemp = document.getElementById('batt-min-temp');
    var battAveTemp = document.getElementById('batt-ave-temp');
    var battSOC = document.getElementById('batt-soc');

    var motorVelocity = document.getElementById('motor-velocity');
    var motorTemp = document.getElementById('motor-temp');
    var mcTemp = document.getElementById('mc-temp');
    var motorCurrent = document.getElementById('motor-current');
    var motorVoltage = document.getElementById('motor-voltage');

    var batteryLow = document.getElementById('battery-low');
    var batteryFull = document.getElementById('battery-full');
    var batteryCommFault = document.getElementById('comm-fault');

    var chargeOC = document.getElementById('chg-overcurrent');
    var dischargeOC = document.getElementById('dchg-overcurrent');
    var overTemp = document.getElementById('overtemp');

    var undervoltage = document.getElementById('undervoltage');
    var overvoltage = document.getElementById('overvoltage');
    var generalFault = document.getElementById('general-fault');

    var relayFault = document.getElementById('relay-fault');
    var k3Contactor = document.getElementById('k3-contactor');
    var k2Contactor = document.getElementById('k2-contactor');
    var k1Contactor = document.getElementById('k1-contactor');
    var faultState = document.getElementById('fault-state');

    var fanOn = document.getElementById('fan-on');
    var llimSet = document.getElementById('llim-set');
    var hlimSet = document.getElementById('hlim-set');
    var canContactor = document.getElementById('can-contactor');
    var hardwireContactor = document.getElementById('hardwire-contactor');
    var interlockTripped = document.getElementById('interlock-tripped');
    var loadPower = document.getElementById('load-power');
    var sourcePower = document.getElementById('source-power');

    var isolationFault = document.getElementById('isolation-fault');
    var lowSOH = document.getElementById('low-soh');
    var hotTemp = document.getElementById('hot-temp');
    var coldTemp = document.getElementById('cold-temp');
    var highVoltage = document.getElementById('high-voltage');
    var lowVoltage = document.getElementById('low-voltage');

    var voltageLockout = document.getElementById('voltage-lockout');
    var configError = document.getElementById('config-error');
    var watchdogReset = document.getElementById('watchdog-reset');
    var dcOV = document.getElementById('dc-overvoltage');
    var softwareOC = document.getElementById('software-overcurrent');
    var hardwareOC = document.getElementById('hardware-overcurrent');

    var tempCtx = document.getElementById('tempChart').getContext('2d');
    var vAndACtx = document.getElementById('vAndAChart').getContext('2d');

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

    var tempTimeCount = 0;

    setInterval(function() {
        let data = Math.floor(Math.random() * 100) + 1
        let chartData = getData(data, tempTimeCount);

        if (chartData.valid) {
            updateChart(tempChart, chartData.data, chartData.timeStamp, 0);
        }

        let data2 = Math.floor(Math.random() * 120) + 1
        let chartData2 = getData(data2, tempTimeCount);

        if (chartData2.valid) {
            updateChart(vAndAChart, chartData2.data, chartData2.timeStamp, 0);
        }

        let data3 = Math.floor(Math.random() * 60) + 1
        let chartData3 = getData(data3, tempTimeCount);

        if (chartData3.valid) {
            updateChartNoX(vAndAChart, chartData3.data, 1);
        }

        tempTimeCount += 0.5;
    }, 500);
}
