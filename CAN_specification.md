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
