const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('./data/cleanups');
require('./data/autoUpdates');

const dataControl = require('./control/controlData');

app.use(cors({
  origin: 'http://localhost:5173', // Change this to your frontend's URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to serve static files from the React `dist` folder
app.use(express.json());

app.get('/api/get-rides' , dataControl.getRide);
app.get('/api/get-single-ride' , dataControl.getSingleRide);
app.get('/api/get-passengers-ofSingle-ride' , dataControl.getSingleRidePassengers);
app.get('/api/get-ride-req' , dataControl.getRideReq);
app.get('/api/get-notification' , dataControl.getNotification);
app.get('/api/get-future-rides' , dataControl.getFutureRides);
app.get('/api/user-data' , dataControl.getUserData);
app.get('/api/energy' , dataControl.getEnergyData);
app.get('/api/co2' , dataControl.getCo2Data);


app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve `index.html` for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../','frontend','dist','index.html'));
});


app.post('/api/contact' , dataControl.postContactData);
app.post('/api/user' , dataControl.createUser);
app.post('/api/offer-ride' , dataControl.postRide);
app.post('/api/booking' , dataControl.postBooking);
app.post('/api/postride-req' , dataControl.postRideReq);
app.post('/api/notification' , dataControl.postNotification);
app.post('/api/handleRequest' , dataControl.handleRequest);
app.post('/api/deleteNotification' , dataControl.deleteNotification);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
