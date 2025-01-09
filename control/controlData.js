
const db = require('../data/initialize');
exports.postContactData = async (req, res) => {
    const contactDetails = req.body;
    try{
      await db.execute('insert into contact(fname,lname,email,phone,msg) values(?,?,?,?,?)',[contactDetails.fname , contactDetails.lname,contactDetails.email , contactDetails.phone,contactDetails.msg]);
  
      console.log('Form submitted with data:', contactDetails);
      res.status(201).send('msg received');
    }
    catch(err){
      console.log('database error,please try again',err.message);
    }
};
exports.createUser = async (req, res) => {
    console.log(req.body);
    const {name , email} = req.body;
    try{
      await db.execute('insert into user(name,email) values(?,?)',[name , email]);
  
      console.log('Form submitted with data:', name , email);
      res.status(201).send('msg received');
    }
    catch(err){
      console.log('database error: ',err.message);
    }
};
exports.postRide = async (req, res) => {
    console.log(req.body);
    const {departure,destination,seats,price,date,time,vehicleType,vehicleDetails,instantBooking,distance , email} = req.body;
    try{
      await db.execute('insert into ride(departure,destination,seats,price,date,time,vehicleType,vehicleDetails,instantBooking,distance,email) values(?,?,?,?,?,?,?,?,?,?,?)',[departure,destination,seats,price,date,time,vehicleType,vehicleDetails,instantBooking,distance , email]);
  
      console.log('Form submitted with data:', departure,destination,seats,price,date,time,vehicleType,vehicleDetails,instantBooking,distance);
      res.status(201).send('msg received');
    }
    catch(err){
      console.log('database error: ',err.message);
    }
};


exports.getRide = async (req, res) => {
  const { to , from , date } = req.query;  // Get the parameter from the query string

  console.log(to,from,date);
  if (!to || !from || !date) {
    return res.status(400).send('Parameter is required');
  }

  // const query = 'SELECT name,email,user_id from user';
  const query = 'SELECT r.rid as id , r.departure as departure, r.destination as `to`,r.seats , r.price , r.time as departureTime , r.instantBooking,r.vehicleDetails as vehicle, u.name  FROM ride r inner join user u on u.email = r.email where r.departure = ? and r.destination = ? and r.date = ?';
  try {
    const [results] = await db.execute(query ,[from ,to,date]);
    console.log('Results:', results);
    res.json(results);  // Send the fetched data as JSON response
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}

