const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const dataControl = require('./control/controlData');

app.use(cors({
  origin: 'http://localhost:5173', // Change this to your frontend's URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to serve static files from the React `dist` folder
app.use(express.json());

app.get('/api/get-rides' , dataControl.getRide);

// app.use(express.static(path.join(__dirname, '../frontend/dist')));


// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
// });
// Catch-all route to serve `index.html` for any unmatched routes
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../','frontend','dist','index.html'));
// });


app.post('/api/contact' , dataControl.postContactData);
app.post('/api/user' , dataControl.createUser);
app.post('/api/offer-ride' , dataControl.postRide);
app.post('/api/booking' , dataControl.postBooking);
app.post('/api/notification' , dataControl.postNotification);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
