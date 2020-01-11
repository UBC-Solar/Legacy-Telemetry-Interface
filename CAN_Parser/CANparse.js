exports.canParser = function parseRaw(receive) {
    var id = receive["id"];
    var message = receive["data"];
    var milli = receive["timestamp"];

    //Msg 0x622, Battery Faults + Warnings
    if (id == 0x622) {

        //Msg 0x622, Byte 0: State of System
        var relayFault = (message[0] >> 4 & 1);
        var K3 = (message[0] >> 3 & 1);
        var K2 = (message[0] >> 2 & 1);
        var K1 = (message[0] >> 1 & 1);
        var faultState = (message[0] & 1);

        //Msg 0x522, Byte 1, Byte 2: Timer
        var timer = 0;

        //Msg 0x622, Byte 4: Fault Codes
        var fanOn = (message[3] >> 7 & 1);
        var LLIM = (message[3] >> 6 & 1);
        var HLIM = (message[3] >> 5 & 1);
        var CANrequest = (message[3] >> 4 & 1);
        var HARDWIRErequest = (message[3] >> 3 & 1);
        var interlock = (message[3] >> 2 & 1);
        var powerLoad = (message[3] >> 1 & 1);
        var powerSource = (message[3] & 1);

        //Msg 0x622, Byte 5: Level Faults
        var overVoltage = (message[5] >> 7 & 1);
        var underVoltage = (message[5] >> 6 & 1);
        var overTemperature = (message[5] >> 5 & 1);
        var dischargeOvercurrent = (message[5] >> 4 & 1);
        var chargeOvercurrent = (message[5] >> 3 & 1);
        var commFault = (message[5] >> 2 & 1);
        var interlockTrip = (message[5] >> 1 & 1);
        var drivingOff = (message[5] >> 0 & 1);

        //Msg 0x622, Byte 6: Warnings
        var isoFault = (message[6] >> 7 & 1);
        var lowSOH = (message[6] >> 6 & 1);
        var hotTemp = (message[6] >> 5 & 1);
        var coldTemp = (message[6] >> 4 & 1);
        var dischargeOC = (message[6] >> 3 & 1);
        var chargeOC = (message[6] >> 2 & 1);
        var highVolt = (message[6] >> 1 & 1);
        var lowVolt = (message[6] >> 0 & 1);

        var send =
        {
            "ID": id,
			"timeStamp": milli,
			"relayFault": relayFault,
            "K3": K3,
            "K2": K2,
            "K1": K1,
            "faultState": faultState,
            "timer": timer,
            "fanOn": fanOn,
            "LLIM": LLIM,
            "HLIM": HLIM,
            "CANrequest": CANrequest,
            "HARDWIRErequest": HARDWIRErequest,
            "interlock": interlock,
            "powerLoad": powerLoad,
            "powerSource": powerSource,
			"overVoltage": overVoltage,
            "underVoltage": underVoltage,
            "overTemperature": overTemperature,
            "dischargeOvercurrent": dischargeOvercurrent,
            "chargeOvercurrent": chargeOvercurrent,
            "commFault": commFault,
            "interlockTrip": interlockTrip,
            "drivingOff": drivingOff,
            "isoFault": isoFault,
            "lowSOH": lowSOH,
            "hotTemp": hotTemp,
            "coldTemp": coldTemp,
            "dischargeOC": dischargeOC,
            "chargeOC": chargeOC,
            "highVolt": highVolt,
            "lowVolt": lowVolt
        }

        return send;


    } else if (id == 0x623) {
        //Msg 0x623, Battery Voltages
        var packVoltage = (receive["data"][0] << 8) | receive["data"][1];
        var minVoltage = receive["data"][2]  / 10;
        var maxVoltage = receive["data"][4] / 10;

        var send =
        {
            "ID": 0x623,
            "timeStamp": milli,
            "packVoltage": packVoltage,
            "minVoltage": minVoltage,
            "maxVoltage": maxVoltage
        }

        return send;


    } else if (id == 0x624) {
        //Msg 0x624, Battery current
        var current = twosComplement16((receive["data"][0] << 8) | receive["data"][1]);

        var send =
        {
            "ID": 0x624,
            "timeStamp": milli,
            "current": current
        }

        return send;
    
    //
    } else if (id == 0x626) {
        //Msg 0x626, Battery state of charge
        var SOC = twosComplement8(receive["data"][0]);

        var send =
        {
            "ID": 0x626,
            "timeStamp": milli,
            "stateOfCharge": SOC
        }

        return send;

    } else if (id == 0x627) {
        //Msg 0x627, Battery temperature
        var temperature = twosComplement8(receive["data"][0]);
        var minTemp = twosComplement8(receive["data"][2]);
        var maxTemp = twosComplement8(receive["data"][4]);

        var send =
        {
            "ID": 0x627,
            "timeStamp": milli,
            "temperature": temperature,
            "minTemp": minTemp,
            "maxTemp": maxTemp

        }

        return send;

    } else if (id == 0x401) {
        //Msg 0x401, Motor Faults + Warnings
        var voltageLockOut = ((receive["data"][5] >> 6) & 1);
        var configError = ((receive["data"][5] >> 5) & 1);
        var watchdogReset = ((receive["data"][5] >> 4) & 1);
        var badMotor = ((receive["data"][5] >> 3) & 1);
        var DCOverVoltage = ((receive["data"][5] >> 2) & 1);
        var softwareOverCurrent = ((receive["data"][5] >> 1) & 1);
        var hardwareOverCurrent = ((receive["data"][5] >> 0) & 1);

        var send =
        {
            "ID": 0x401,
            "timeStamp": milli,
            "voltageLockOut": voltageLockOut,
            "configError": configError,
            "watchdogReset": watchdogReset,
            "badMotor": badMotor,
            "DCOverVoltage": DCOverVoltage,
            "softwareOverCurrent": softwareOverCurrent,
            "hardwareOverCurrent": hardwareOverCurrent
        }

        return send;
        
    } else if (id == 0x402) {
        //Msg 0x402, Motor current and voltage
        var busCurrent = ieee32ToFloat((receive["data"][0] << 24) | (receive["data"][1] << 16) | (receive["data"][2] << 8) | (receive["data"][3]));
        var busVoltage = ieee32ToFloat((receive["data"][4] << 24) | (receive["data"][5] << 16) | (receive["data"][6] << 8) | (receive["data"][7]));

        var send =
        {
            "ID": 0x402,
            "timeStamp": milli,
            "busCurrent": busCurrent,
            "busVoltage": busVoltage
        }

        return send;

    } else if (id == 0x403) {
        //Msg 0x403, Motor velocity
        var velocity = ieee32ToFloat((receive["data"][0] << 24) | (receive["data"][1] << 16) | (receive["data"][2] << 8) | (receive["data"][3]));

        var send =
        {
            "ID": 0x403,
            "timeStamp": milli,
            "velocity": velocity,
        }

        return send;

    } else if (id == 0x40B) {

        var motorTemp = ieee32ToFloat((receive["data"][0] << 24) | (receive["data"][1] << 16) | (receive["data"][2] << 8) | (receive["data"][3]));
        var mcTemp = ieee32ToFloat((receive["data"][4] << 24) | (receive["data"][5] << 16) | (receive["data"][6] << 8) | (receive["data"][7]));

        var send =
        {
            "ID": 0x40B,
            "timeStamp": milli,
            "motorTemp": motorTemp,
            "motorControllerTemp": mcTemp
        }

        return send;

    }
    
    else {

        var send = {

            "ID": recieve["id"],
            "timestamp": milli,
            "msg": "unknown"
        }

        return send;
    }
}

function twosComplement16(intVal) {

    var sign = (intVal >> 15) & 1;

    if (sign === 1)
    {
        intVal = -32768 + (intVal & 0x7FFF);
    }

    return intVal;

}

function twosComplement8(intVal){

    var sign = (intVal >> 7) & 1;

    if (sign === 1)
    {
        intVal = -128 + (intVal & 0x7F);
    }

    return intVal;

}

function ieee32ToFloat(intval) {
    var fval = 0.0;
    var x;//exponent
    var m;//mantissa
    var s;//sign
    s = (intval & 0x80000000)?-1:1;
    x = ((intval >> 23) & 0xFF);
    m = (intval & 0x7FFFFF);
    switch(x) {
        case 0:
            break;
        case 0xFF:
            if (m) fval = NaN;
            else if (s > 0) fval = Number.POSITIVE_INFINITY;
            else fval = Number.NEGATIVE_INFINITY;
            break;
        default:
            x -= 127;
            m += 0x800000;
            fval = s * (m / 8388608.0) * Math.pow(2, x);
            break;
    }
    return fval;
} 
