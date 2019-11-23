
window.onload = function()
{

    var serverConnStatus = document.getElementById('ServerConnectStatus');
    var aveBattTemp = document.getElementById('ave-batt-temp');
    var aveBattTempTS = document.getElementById('ave-batt-temp-ts');
    var maxBattTemp = document.getElementById('max-batt-temp');
    var maxBattTempTS = document.getElementById('max-batt-temp-ts');
    var minBattTemp = document.getElementById('min-batt-temp');
    var minBattTempTS = document.getElementById('min-batt-temp-ts');    

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
            aveBattTemp.innerHTML = data['data']['ave-batt-temp'];;
            aveBattTempTS.innerHTML = data['timestamp'];

            maxBattTemp.innerHTML = data['data']['max-batt-temp'];
            maxBattTempTS.innerHTML = data['timestamp'];
            
            minBattTemp.innerHTML = data['data']['min-batt-temp'];
            minBattTempTS.innerHTML = data['timestamp'];
        }
    )

}