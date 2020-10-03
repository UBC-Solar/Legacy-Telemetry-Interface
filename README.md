# Telemetry-Interface
Data visualization interface for UBC Solar's Daybreak vehicle.

To set up this project locally,

1. Ensure that you have node.js and npm installed on your device.
2. Clone this repository and navigate to it.
3. To install all dependencies:
```
npm install
```
4. To run the program:
```
npm start
```
Then point your browser to http://localhost:3000

5. Navigate to the sender/ folder and run main.py . This will receive serial data from a COM port and make HTTP requests to the web server.


To Do:
- Modify the python script to receive serial data from a COM port
- Display battery data with a real time plot using chart.js
- Stress testing by sending a lot of serial data rapidly
- Integration with radio link
- Add Map and Weather data using some web APIs.
- Fix the CSS: change px to rem/em so it fits every screen properly

- Relevant information for model fitting

    -> [Telemetry] Vehicle current battery charge curve
    -> Calculated battery charge curve

    -> Front Wind Speed

    -> [Telemetry] Actual Road Gradient
    -> Approximate Road Gradient

    -> Solar Power Input
    -> [Telemetry] Current from Arrays
    -> [Telemetry] Current to Motors
    -> [Telemetry] Current from battery

    -> [Telemetry] Vehicle Speed
    -> Calculated Vehicle Speed   

- Parameters to fit
    -> Road Friction
    -> Motor Torque Curve
    -> Solar Panel Curve
    -> Battery Curve  

- Relevant External Information for Prediction to feed into model
    -> [Telemetry] Vehicle current battery charge
    -> Frontal Wind Speed
        -> [Weather API] Wind Speed
        -> [Weather API] Wind Direction
        -> Vehicle direction
            -> [Telemetry] GPS coordinates
    -> Approximate Road Gradient
        -> [Telemetry] Vehicle current GPS coordinates
        -> [Maps API] Route coordinates
        -> [Maps API] Elevations at every coordinate
    -> Solar Power Input:
        -> [Weather API] Cloud Cover: https://scool.larc.nasa.gov/lesson_plans/CloudCoverSolarRadiation.pdf 
        -> position of the sun
            -> [Telemetry] Vehicle current GPS Coordinates
            -> Vehicle direction
                -> [Telemetry] GPS coordinates
    -> Intermediate End-Point
    -> Final End-Point
        
- Run simulation(Max Distance Mode)
    -> Goal: Maximise the distance travelled throughout the day,
             while ensuring battery charge ends up above a certain number 
    -> Strategy:
        -> calculate time until sundown
        -> divide time into 1h segments, producing x segments of time
        -> Obtain a large future path with distances, weather and elevations
        -> We now have a function with x independant variables.
        -> Use some form of gradient descent to approximate the x speeds
    -> Final Output:
        - Speed to travel at every hour
        - Battery percentage at end
        - Projected Total Distance

- Run simulation(Checkpoint Mode)
    -> Goal: Minimise time taken to reach checkpoint,
             while ensuring battery charge ends up above a certain number
    -> Strategy: 
        -> obtain current position and checkpoint
        -> obtain route parameters between current position and checkpoint
        -> divide route into x segments of distance
        -> We now have a function with x independant variables
        -> Use some form of gradient descent to approximate the x speeds
    -> Final Output:
        - If checkpoint is possible
        - Speed to travel at each point
        - Battery percentage at end
        - Projected Time Taken to reach destination 

-> maximum distance travellable to deplete battery from xxx% to yyy%
-> maximum distance travellable in a given period of time 
-> minimum time to travel a given distance


