// jshint esversion:6

// This JS file is handling the post request that is 
// fetching the old data.

window.onload = () => {
    var socket = io();
    const $ = document.querySelector.bind(document);
    const btn = $(".btn");
    const dataName = $("#data-name");
    const timeStamp = $("#time-stamp");

    btn.addEventListener('click', (e) => {
        console.log('clicked');
        fetch('/history', {method: 'POST'})
        .then((res) => {
            if(res.ok){
                console.log("ok~~");
            } 
        })
        .catch((err) => {
            console.log(err);
        });
    });
    
    socket.on("battery-faults-history", (data) => {

    });
    socket.on("battery-voltage-history", (data) => {

    });
    socket.on("battery-current-history", (data) => {

    });
    socket.on("battery-soc-history", (data) => {

    });
    socket.on("battery-temperature-history", (data) => {

    });
    socket.on("motor-faults-history", (data) => {

    });
    socket.on("motor-power-history", (data) => {

    });
    socket.on("motor-velocity-history", (data) => {

    });
    socket.on("motor-temperature-history", (data) => {

    });

};