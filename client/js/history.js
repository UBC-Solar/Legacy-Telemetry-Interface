// jshint esversion:6

// This JS file is handling the post request that is 
// fetching the old data.

// const a = document.querySelector("#battery-vol");
// const b = document.querySelector("#max-cell-vol");
// const c = document.querySelector("#min-cell-vol");
// console.log(a);

// a.innerHTML = "2";
// b.innerHTML = "3";
// c.innerHTML = "4";

window.onload = () => {
    const $ = document.querySelector.bind(document);
    const lastTimestamp = $("#time-stamp");
    const relayFault = $(".relay-fault");
    const k1Contactor = $(".k1");
    const k2Contactor = $(".k2");
    const k3Contactor = $(".k3");
    const faultState = $(".fault-state");

    const isolationFault = $(".iso-fault");
    const lowSOH = $(".low-SOH");
    const hotTemp = $(".hot-temp");
    const coldTemp = $(".cold-temp");
    const highVoltage = $(".high-vol");
    const lowVoltage = $(".low-vol");

    const fanOn = $(".fan-on");
    const llimSet = $(".LLIM");
    const hlimSet = $(".HLIM");
    const canContactor = $(".CAN-req");
    const hardwireContactor = $(".hardwire-req");
    const interlockTripped = $(".interlock-tripped");
    const loadPower = $(".power-from-load");
    const sourcePower = $(".power-from-source");
    const batteryLow = $(".battery-low");
    const batteryFull = $(".battery-full");
    const batteryCommFault = $(".comm-fault");
    const chargeOC = $(".charge-over-current");
    const dischargeOC = $(".discharge-over-current");
    const overTemp = $(".over-temp");
    const underVoltage = $(".under-vol");
    const overVoltage = $(".over-vol");
    const generalFault = $(".general-fault");

    const voltageLockout = $(".vol-lock-out");
    const configError = $(".config-error");
    const watchdogReset = $(".watchdog-rst");
    const dcOV = $(".DC-over-vol");
    const softwareOC = $(".sft-over-current");
    const hardwareOC = $(".hrd-over-current");

    const battVoltage = $("#battery-vol");
    const battMaxCellVoltage = $("#max-cell-vol");
    const battMinCellVoltage = $("#min-cell-vol");

    const battMaxTemp = $("#batt-max-temp");
    const battMinTemp = $("#batt-min-temp");
    const battAveTemp = $("#batt-ave-temp");

    const motorTemp = $("#motor-temp");
    const mcTemp = $("#motor-control-temp");

    const battCurrent = $("#batt-current");

    const motorCurrent = $("#motor-current");
    const motorVoltage = $("#motor-vol");

    const motorVelocity = $("#motor-velocity");

    const battSOC = $("#batt-soc");

    var socket = io();
    // const socket = io('http://localhost:3000/history');

    socket.on("battery-faults-history", (data) => {
        lastTimestamp.innerHTML = data['timeStamp'];

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
            overVoltage.style.color = "red";
        } else {
            overVoltage.style.color = "green";
        }

        if (data['underVoltage'] === 1) {
            underVoltage.style.color = "red";
        } else {
            underVoltage.style.color = "green";
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

    });

    socket.on("battery-voltage-history", (data) => {
        lastTimestamp.innerHTML = data['timeStamp'];
        battVoltage.innerHTML = data['packVoltage'];
        battMaxCellVoltage.innerHTML = data['maxVoltage'];
        battMinCellVoltage.innerHTML = data['minVoltage'];
    });

    socket.on("battery-current-history", (data) => {
        lastTimestamp.innerHTML = data['timeStamp'];
        battCurrent.innerHTML = data['current'];
    });
    socket.on("battery-soc-history", (data) => {
        lastTimestamp.innerHTML = data['timeStamp'];
        battSOC.innerHTML = data['stateOfCharge'];
    });

    socket.on('battery-temperature-history', (data) => {
        console.log(data);
        lastTimestamp.innerHTML = data['timeStamp'];
        battMaxTemp.innerHTML = data['maxTemp'];
        battMinTemp.innerHTML = data['minTemp'];
        battAveTemp.innerHTML = data['temperature'];
        console.log("after rendering");
    });

    socket.on("motor-faults-history", (data) => {
        lastTimestamp.innerHTML = data['timeStamp'];


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
    });

    socket.on("motor-power-history", (data) => {
        lastTimestamp.innerHTML = data['timeStamp'];
        motorCurrent.innerHTML = data['busCurrent'];
        motorVoltage.innerHTML = data['busVoltage'];
    });

    socket.on("motor-velocity-history", (data) => {
        lastTimestamp.innerHTML = data['timeStamp'];
        motorVelocity.innerHTML = data['velocity'];
    });

    socket.on("motor-temperature-history", (data) => {
        console.log(data);
        lastTimestamp.innerHTML = data['timeStamp'];
        motorTemp.innerHTML = data['motorTemp'];
        mcTemp.innerHTML = data['motorControllerTemp'];
    });
}