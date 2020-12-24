# -*- coding: utf-8 -*-
"""
Script to receive data from a COM port and HTTP POST it
"""

import requests
import json
import polyline
import time

google_api_key = "AIzaSyCPgIT_5wtExgrIWN_Skl31yIg06XGtEHg"
weather_key = "51bb626fa632bcac20ccb67a2809a73b"
nrel_key = "5XAK2QQGzppY8Nj12JZJY6soHA2vtQXVPDy0Nsrw"

#UBC, Vancouver
ubc_lat = 49.2606
ubc_lng = -123.2460

#University of Waterloo, Waterloo
uwaterloo_lat = 43.4723
uwaterloo_lng = -80.5449

#SFU, Burnaby
sfu_lat = 49.278889
sfu_lng = -122.916111

#Get Approximate Location
def get_approximate_location():

    #gets a very approximate location
    url = "https://www.googleapis.com/geolocation/v1/geolocate?key={}".format(google_api_key)
    data = {}
    r = requests.post(url, json=data)
    response = json.loads(r.text)

    #get current coordinates
    lat = response['location']['lat']
    lng = response['location']['lng']
    accuracy = response['accuracy']

    return (lat, lng, accuracy)

#Test Weather API
def weather_api_test(lat, lng):

    url = "https://api.openweathermap.org/data/2.5/onecall?lat={}&lon={}&appid={}".\
            format(lat, lng, weather_key)

    """
    url = "http://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}".\
            format(lat, lng, weather_key)
    """

    r = requests.get(url)
    response = json.loads(r.text)

    """ temperature, wind speed, wind degrees, cloud coverage, weather description
    - weather at current time
    - weather 3h from now
    - weather 6h from now
    - weather 9h from now
    - weather 12h from now
    """

    timezone_offset_unix = response['timezone_offset']
    sunrise_unix = response['sunrise']
    sunset_unix = response['sunset'] 

    return response

#Test Solar API
def solar_forecast_api_test(lat, lng):

    nrel_url = "https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key={}&lat={}&lon={}".\
                format(nrel_key, lat, lng)

    r = requests.get(nrel_url)
    response = json.loads(r.text)

    return response

#Get elevation
def get_current_elevation(lat, lng):

    #gets the current elevation
    url = 'https://maps.googleapis.com/maps/api/elevation/json?locations={},{}&key={}'.\
            format(ubc_lat, ubc_lng, google_api_key)

    r = requests.get(url)
    response = json.loads(r.text)

    return response

#Get path between 2 coordinates
def get_directions(origin_lat, origin_lng, dest_lat, dest_lng):

    #Get the directions between 2 points
    url = "https://maps.googleapis.com/maps/api/directions/json?origin={},{}&destination={},{}&key={}"\
        .format(origin_lat, origin_lng, dest_lat, dest_lng, google_api_key)
    r = requests.get(url)

    response = json.loads(r.text)

    route_steps = response['routes'][0]['legs'][0]['steps']

    route_instructions = []
    polyline_points = []

    for step in route_steps:
        route_instructions.append(step['html_instructions'])
        polyline_raw = step['polyline']['points']
        temp = polyline.decode(polyline_raw)
        polyline_points = polyline_points + temp

    return (route_instructions, polyline_points)

#Me and the boyz driving from ubc to sfu
def simulate_driving_to_sfu():
    route_instructions, polyline_points = get_directions(ubc_lat, ubc_lng, sfu_lat, sfu_lng)

    print("number of points: {}".format(len(polyline_points)))

    print("######################")

    for instruction in route_instructions:
    
        print(instruction)

    print("######################")

    #Send coordinates to the server as a POST request
    data = {}
    data['id'] = 0x800
    data['timestamp'] = 500

    for point in polyline_points:
    
        data['current_latitude'] = point[0]
        data['current_longitude'] = point[1]

        r = requests.post('http://localhost:8080', json=data)

        time.sleep(0.2)



# simulate_driving_to_sfu()


import requests

data = {}
data['id'] = 0x624
data['data'] = [0x10, 0x64, 0x20, 0x30, 0x40, 0x50, 0x60, 0x70]
data['timestamp'] = 556;

r = requests.post('http://localhost:3000', json=data)

print(r.status_code);