// Simple Google Map API

var basic_map;
var marker;
var breadcrumbs = [];

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(49.2827, -123.1207),
        zoom: 5,
    };
    basic_map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    //set initial marker:
    var mylatlng = new google.maps.LatLng(49.2827, -123.1207);
    marker = new google.maps.Marker({
        position: mylatlng,
        map: basic_map,
        icon: 'https://earth.google.com/images/kml-icons/track-directional/track-0.png'
    });
    
}

function place_marker(lat, lng) {

    marker.setMap(null);
    marker = null;

    var mylatlng = new google.maps.LatLng(lat, lng);
    marker = new google.maps.Marker({
        position: mylatlng,
        map: basic_map,
        icon: 'https://earth.google.com/images/kml-icons/track-directional/track-0.png'
    });
}

function place_breadcrumb(lat, lng) {

    var mylatlng = new google.maps.LatLng(lat, lng);
    var new_breadcrumb;

    new_breadcrumb = new google.maps.Marker({
        position: mylatlng,
        map: basic_map,
        icon: 'https://maps.google.com/mapfiles/kml/shapes/placemark_circle.png'
    });

    breadcrumbs.push(new_breadcrumb);
} 
