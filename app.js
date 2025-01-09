const express = require('express');
const path = require('path');

const app = express();


const dataControl = require('./control/controlData');

// Middleware to serve static files from the React `dist` folder
app.use(express.json());
app.get('/api/get-rides' , dataControl.getRide);

app.use(express.static(path.join(__dirname, '../frontend/dist')));


// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
// });
// Catch-all route to serve `index.html` for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../','frontend','dist','index.html'));
});


app.post('/api/contact' , dataControl.postContactData);
app.post('/api/user' , dataControl.createUser);
app.post('/api/offer-ride' , dataControl.postRide);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
