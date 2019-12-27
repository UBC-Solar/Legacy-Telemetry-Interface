
window.onload = function () {

    var serverStatus = document.getElementById('server-status');
    var lastTimestamp = document.getElementById('last-timestamp');

    var battVoltage = document.getElementById('batt-voltage');
    var battMinCellVoltage = document.getElementById('batt-min-cell-voltage');
    var battMaxCellVoltage = document.getElementById('batt-max-cell-voltage');
    var battCurrent = document.getElementById('batt-current');
    var battMaxTemp = document.getElementById('batt-max-temp');
    var battSOC = document.getElementById('batt-supp-voltage');

    var motorSpeed = document.getElementById('motor-speed');
    var motorTemp = document.getElementById('motor-temp');
    var motorCurrent = document.getElementById('motor-current');

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

    var fanOn = docment.getElementById('fan-on');
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

    var socket = io();

    socket.on(
        'introduction',
        function (data) {

            serverStatus .innerHTML = "Connected";
            serverStatus.style.color = "green"

        }
    )

    socket.on(
        'battery-temperature',
        function (data) {

            lastTimestamp.innerHTML = data['timeStamp'];
            battMaxTemp.innerHTML = data['maxTemp'];
        }

    )

    socket.on(
        'battery-faults',
        function (data) {
            //0x622

            lastTimestamp.innerHTML = data['timeStamp'];
            
            if (data['relayFault'] === true)
            {
                relayFault.style.color = "red";
            }
            else
            {
                relayFault.style.color = "green";
            }

            if (data['K3'] === true)
            {
                k3Contactor.style.color = "red";
            }
            else
            {
                k3Contactor.style.color = "green";
            }

            if (data['K2'] === true)
            {
                k2Contactor.style.color = "red";
            }
            else
            {
                k2Contactor.style.color = "green";
            }

            if (data['K1'] === true)
            {
                k1Contactor.style.color = "red";
            }
            else
            {
                k1Contactor.style.color = "green";
            }

            if (data['faultState'] === true)
            {
                faultState.style.color = "red";
                generalFault.style.color = "red";
            }
            else
            {
                faultState.style.color = "green";
                generalFault.style.color = "green";
            }

            if (data['fanOn'] === true)
            {
                fanOn.style.color = "red";
            }
            else
            {
                fanOn.style.color = "green";
            }

            if (data['LLIM'] === true)
            {
                llimSet.style.color = "red";
            }
            else
            {
                hlimSet.style.color = "green";
            }

            if (data['CANrequest'] === true)
            {
                canContactor.style.color = "red";
            }
            else
            {
                canContactor.style.color = "green";
            }

            if (data['HARDWIRErequest'] === true)
            {
                hardwireContactor.style.color = "red";
            }
            else
            {
                hardwireContactor.style.color = "green";
            }

            if (data['interlock'] === true)
            {
                interlockTripped.style.color = "red";
            }
            else
            {
                interlockTripped.style.color = "green";
            }

            if (data['powerLoad'] === true)
            {
                loadPower.style.color = "red";
            }
            else
            {
                loadPower.style.color = "green";
            }

            if (data['powerSource'] === true)
            {
                sourcePower.style.color = "red";
            }
            else
            {
                sourcePower.style.color = "green";
            }

            if (data['overVoltage'] === true)
            {
                overvoltage.style.color = "red";
            }
            else
            {
                overvoltage.style.color = "green";
            }

            if (data['underVoltage'] === true)
            {
                undervoltage.style.color = "red";
            }
            else
            {
                undervoltage.style.color = "green";
            }

            if (data['overTemperature'] === true)
            {
                overTemp.style.color = "red";
            }
            else
            {
                overTemp.style.color = "green";
            }

            if (data['chargeOvercurrent'] === true)
            {
                chargeOC.style.color = "red";
            }
            else
            {
                chargeOC.style.color = "green";
            }

            if (data['dischargeOverCurrent'] === true)
            {
                dischargeOC.style.color = "red";
            }
            else
            {
                dischargeOC.style.color = "green";
            }

            if (data['commFault'] === true)
            {
                batteryCommFault.style.color = "red";
            }
            else
            {
                batteryCommFault.style.color = "green";
            }

            if (data['interlockTrip'] === true)
            {
                interlockTripped.style.color = "red";
            }
            else
            {
                interlockTripped.style.color = "green";
            }

            if (data['isolationFault'] === true)
            {
                isolationFault.style.color = "red";
            }
            else
            {
                isolationFault.style.color = "green";
            }

            if (data['lowSOH'] === true)
            {
                lowSOH.style.color = "red";
            }
            else
            {
                lowSOH.style.color = "green";
            }

            if (data['dischargeOC'] === true)
            {
                dischargeOC.style.color = "red";
            }
            else
            {
                dischargeOC.style.color = "green";
            }

            if (data['chargeOC'] === true)
            {
                chargeOC.style.color = "red";
            }
            else
            {
                chargeOC.style.color = "green";
            }

            if (data['hotTemp'] === true)
            {
                hotTemp.style.color = "red";
            }
            else
            {
                hotTemp.style.color = "green";
            }

            if (data['coldTemp'] === true)
            {
                coldTemp.style.color = "red";
            }
            else
            {
                coldTemp.style.color = "green";
            }

            if (data['highVolt'] === true)
            {
                highVoltage.style.color = "red";
                batteryFull.style.color = "red";
            }
            else
            {
                highVoltage.style.color = "green";
                batteryFull.style.color = "green"
            }

            if (data['lowVolt'] === true)
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
    )

    socket.on(
        'battery-voltage',
        function (data) {
            
            lastTimestamp.innerHTML = data['timeStamp'];
            battVoltage.innerHTML = data['packVoltage'];
            battMaxCellVoltage.innerHTML = data['maxVoltage'];
            battMinCellVoltage.innerHTML = data['minVoltage'];

        }
    )

    socket.on(
        'battery-current',
        function (data) {
            
            lastTimestamp.innerHTML = data['timeStamp'];
            battCurrent.innerHTML = data['current'];

        }
    )

    socket.on(
        'battery-soc',
        function (data) {
            
            lastTimestamp.innerHTML = data['timeStamp'];
            battSOC.innerHTML = data['stateOfCharge'];

        }
    )

    socket.on(
        'motor-faults',
        function (data) {
            
            if (data['voltageLockOut'] === true)
            {
                voltageLockout.style.color = "red";
            }
            else
            {
                voltageLockout.style.color = "green";
            }

            if (data['configError'] === true)
            {
                configError.style.color = "red";
            }
            else
            {
                configError.style.color = "green";
            }

            if (data['watchdogReset'] === true)
            {
                watchdogReset.style.color = "red";
            }
            else
            {
                watchdogReset.style.color = "green";
            }

            if (data['DCOverVoltage'] === true)
            {
                dcOV.style.color = "red";
            }
            else
            {
                dcOV.style.color = "green";
            }

            if (data['softwareOverCurrent'] === true)
            {
                softwareOC.style.color = "red";
            }
            else
            {
                softwareOC.style.color = "green";
            }

            if (data['hardwareOverCurrent'] === true)
            {
                hardwareOC.style.color = "red";
            }
            else
            {
                hardwareOC.style.color = "green";
            }
        }
    )

    socket.on(
        'motor-power',
        function(data) {
            
            lastTimestamp.innerHTML = data['timeStamp'];
            motorCurrent.innerHTML = data['busCurrent'];

        }
    )

    socket.on(
        'motor-velocity',
        function(data) {
            
            lastTimestamp.innerHTML = data['timeStamp'];
            motorSpeed.innerHTML = data['velocity'];

        }
    )

}