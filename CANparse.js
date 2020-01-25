exports.parseRaw = function (receive) {
    var id = receive["id"];
    var message = receive["data"];
    var milli = receive["timestamp"];

    if (id === 0x622) {
        var relayFault = (message >> 59 & 1);
        var K3 = (message >> 60 & 1);
        var K2 = (message >> 61 & 1);
        var K1 = (message >> 62 & 1);
        var faultState = (message >> 63 & 1);

        var timer = "" + message[1] + message[2];

        var fanOn = (message >> 32 & 1);
        var LLIM = (message >> 33 & 1);
        var HLIM = (message >> 34 & 1);
        var CANrequest = (message >> 35 & 1);
        var HARDWIRErequest = (message >> 36 & 1);
        var interlock = (message >> 37 & 1);
        var powerLoad = (message >> 38 & 1);
        var powerSource = (message >> 39 & 1);

        var overVoltage = (message[5] >> 7 & 1);
        var underVoltage = (message[5] >> 6 & 1);
        var overTemperature = (message[5] >> 5 & 1);
        var dischargeOvercurrent = (message[5] >> 4 & 1);
        var chargeOvercurrent = (message[5] >> 3 & 1);
        var commFault = (message[5] >> 2 & 1);
        var interlockTrip = (message[5] >> 1 & 1);
        var drivingOff = (message[5] >> 0 & 1);

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
            "TimeStamp": milli,
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

    } else if (id === 0x623) {
        var packVoltage = receive["data"][0] + receive["data"][1] + ""; // how to make sure js reads as unsigned?
        packVoltage = packVoltage & 0x0FFFF;
        var minVoltage = receive["data"][2];
        var maxVoltage = receive["data"][4];


        var send =
        {
            "ID": 0x623,
            "TimeStamp": milli,
            "packVoltage": packVoltage,
            "minVoltage": minVoltage,
            "maxVoltage": maxVoltage
        }

        return send;

    } else if (id === 0x624) {
        var current = receive["data"][0] + receive["data"][1] + "";

        var send =
        {
            "ID": 0x624,
            "TimeStamp": milli,
            "current": current
        }

        return send;

    } else if (id === 0x626) {

        var SOC = receive["data"][0];

        var send =
        {
            "ID": 0x626,
            "TimeStamp": milli,
            "SOC": SOC
        }


        return send;

    } else if (id === 0x627) {

        var temperature = receive['data'][0];
        var minTemp = receive["data"][2];
        var maxTemp = receive["data"][4];

        var send =
        {
            "ID": 0x627,
            "TimeStamp": milli,
            "Temperature": temperature,
            "minTemp": minTemp,
            "maxTemp": maxTemp

        }

        return send;

    } else if (id === 0x401) {

        var voltageLockOut = ((receive["data"][4] >> 6) & 1);
        var configError = ((receive["data"][4] >> 5) & 1);
        var watchdogReset = ((receive["data"][4] >> 4) & 1);
        var badMotor = ((receive["data"][4] >> 3) & 1);
        var DCOverVoltage = ((receive["data"][4] >> 2) & 1);
        var softwareOverCurrent = ((receive["data"][4] >> 1) & 1);
        var hardwareOverCurrent = ((receive["data"][4] >> 0) & 1);

        var send =
        {
            "ID": 0x401,
            "TimeStamp": milli,
            "voltageLockOut": voltageLockOut,
            "configError": configError,
            "watchdogReset": watchdogReset,
            "badMotor": badMotor,
            "DCOverVoltage": DCOverVoltage,
            "softwareOverCurrent": softwareOvercurrent,
            "hardwareOverCurrent": hardwareOvercurrent
        }

        return send;

    } else if (id === 0x402) {

        var busCurrent = receive["data"][0] + receive["data"][1] + receive["data"][2] + receive["data"][3] + "";//unsure about this
        var busVoltage = receive["data"][4] + receive["data"][5] + receive["data"][6] + receive["data"][7] + "";


        var send =
        {
            "ID": 0x402,
            "TimeStamp": milli,
            "busCurrent": busCurrent,
            "busVoltage": busVoltage
        }

        return send;

    } else if (id === 0x403) {

        var velocity = receive["data"][0] + receive["data"][1] + receive["data"][2] + receive["data"][3] + "";

        var send =
        {
            "ID": 0x403,
            "TimeStamp": milli,
            "velocity": velocity
        }

        return send;

    } else {

        var send = {

            "ID": 0,
            "Data Type": "unknown ID"
        }

        return send;
    }


}
