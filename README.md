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




