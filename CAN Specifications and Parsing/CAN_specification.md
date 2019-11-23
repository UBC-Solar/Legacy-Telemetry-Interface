# CAN specification document
This document details how every important CAN message should be represented as a JSON object.
This ensures that people working on the front end and on the back end are on the same page.

Incoming CAN messages will be represented as a JSON object:
```
var can_msg = 
{
    "id": <Integer from 0x000 to 0x7FF, representing a unique CAN ID>
    "data": <an array of <len> bytes, representing in the order of byte 0 -> byte 7>
    "len": <Integer, representing how many bytes there are in the data field>
    "timestamp: <Integer, representing the UNIX time the message was sent.>

}
```

Here is an example of a JSON object which the server script can send to the front end script:

### Battery Temperature: 0x627
```
var data = 
{
    "msg-id": <Integer from 0x000 to 0x7FF, representing a unique CAN ID>,
    "msg-source": <String, representing the source of the message("bms", "motor-controller")>,
    "timestamp": <Integer, representing the UNIX time the message was sent.>,
    "data": 
        {
            "ave-batt-temp": <Integer, in degrees Celsius>,
            "max-batt-temp": <Integer, in degrees Celsius>,
            "min-batt-temp": <Integer, in degrees Celsius>
        }
}

```
### Solar Car Specifications ###

#### ID: 0x622 ####
```
var send = 
{
    "ID": "0x622",
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

```
#### ID: 0x623 ####
```

var send = 
{
    "ID": "0x623",
    "TimeStamp": milli,
    "packVoltage": packVoltage,
    "minVoltage": minVoltage,
    "maxVoltage": maxVoltage 
}

```
#### ID: 0x624 ####
```

var send = 
{
    "ID": "0x624",
    "TimeStamp": milli,
    "current": current
}

```
#### ID: 0x626 ####
```

var send = 
{
    "ID": "0x626",
    "TimeStamp": milli,
    "stateOfCharge": SOC
}

```
#### ID: 0x627 ####
```

var send = 
{
    "ID": "0x627",
    "TimeStamp": milli,
    "temperature": temperature,
    "minTemp": minTemp,
    "maxTemp": maxTemp
}

```
#### ID: 0x401 ####
```

var send = 
{
    "ID": "0x401",
    "TimeStamp": milli,
    "voltageLockOut": voltageLockOut,
    "configError": configError,
    "watchdogReset": watchdogReset,
    "badMotor": badMotor,
    "DCOverVoltage": DCOverVoltage,
    "softwareOverCurrent": softwareOvercurrent,
    "hardwareOverCurrent": hardwareOvercurrent
}

```
#### ID: 0x402 ####
```

var send = 
{
    "ID": "0x402",
    "TimeStamp": milli,
    "busCurrent": busCurrent,
    "busVoltage": busVoltage
}

```
#### ID: 0x403 ####
```

var send = 
{
    "ID": "0x403",
    "TimeStamp": milli,
    "velocity": velocity
}