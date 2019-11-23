window.onload = function()
{

    var serverConnStatus = document.getElementById("server-connected-disconnected");
    // Battery Temperature 
    var aveBattTemp = document.getElementById("batt-temp");
    var maxBattTemp = document.getElementById("max-batt-temp");
    var minBattTemp = document.getElementById("min-batt-temp");  
    
    // Velocity
    var velocity = document.getElementById("velocity");

    // Battery Voltage
    var battVoltage = document.getElementById("batt-voltage");
    var maxVoltage = document.getElementById("max-batt-volt");
    var minVoltage = document.getElementById("min-batt-volt");

    // Battery Current
    var battCurrent = document.getElementById("batt-current");

    // Battery Charge
    var battSOC = document.getElementById("batt-charge");

    var socket = io();

    socket.on(
        'introduction',
        function(data)
        {
            serverConnStatus.innerHTML = "Connected";
            serverConnStatus.style.color = "green";
        }
    )
    
    socket.on(
        'battery-temp-msg', 
        function(data)
        {
            aveBattTemp.innerHTML = data['Temperature'];

            //maxBattTemp.innerHTML = data['data']['max-batt-temp'];
            
            //minBattTemp.innerHTML = data['data']['min-batt-temp'];
        }
    )

    socket.on('battery-volt-msg', function(data) {
        battVoltage.innerHTML = data["packVoltage"];
        
        //maxVoltage.innerHTML = data["maxVoltage"];

        //minVoltage.innerHTML = data["minVoltage"];
    })

    socket.on('battery-current-msg', function(data) {
        battCurrent.innerHTML = data["current"];
    })

    socket.on('SOC-msg', function(data) {
        battSOC.innerHTML = data["SOC"];
    })

    socket.on('velocity-msg', function(data) {
        velocity.innerHTML = data["velocity"];
    })

}