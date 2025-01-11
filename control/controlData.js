
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
      await db.execute('insert into ride(departure,destination,seats,price,date,time,vehicleType,vehicleDetails,instantBooking,distance,email,avail_seat) values(?,?,?,?,?,?,?,?,?,?,?,?)',[departure,destination,seats,price,date,time,vehicleType,vehicleDetails,instantBooking,distance , email , seats]);
  
      console.log('Form submitted with data:', departure,destination,seats,price,date,time,vehicleType,vehicleDetails,instantBooking,distance,seats);
      res.status(201).send('msg received');
    }
    catch(err){
      console.log('database error: ',err.message);
    }
};

exports.postBooking = async (req, res) => {
    console.log(req.body);
    const {r_email , p_email , seats , isInstant} = req.body;
    try{
      const [avail_seat] = await db.execute('select avail_seat from ride where email=?',[r_email]);
      const bookedSeats = Math.min(seats , avail_seat[0]);
      const status = isInstant?'accepted':'requested';
      console.log(avail_seat , bookedSeats , status);
      await db.execute('insert into booking(r_email , p_email , seats , status) values(?,?,?,?)',[r_email,p_email,bookedSeats,status]);
      console.log('submitted data:', r_email,p_email,seats,isInstant);
      await db.execute('update ride set avail_seat=? where email=?',[bookedSeats , r_email]);
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
  const query = 'SELECT r.rid as id , r.departure as departure, r.destination as `to`,r.avail_seat as seats , r.price , r.time as departureTime , r.instantBooking as isInstant,r.date,r.vehicleDetails as vehicle,r.email, u.name  FROM ride r inner join user u on u.email = r.email where r.departure = ? and r.destination = ? and r.date = ?';
  try {
    const [results] = await db.execute(query ,[from ,to,date]);
    console.log('Results:', results);
    res.json(results);  // Send the fetched data as JSON response
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}

exports.postNotification = async (req , res) => {
  console.log(req.body);
  const {email , title , msg } = req.body;
  try{
    await db.execute('insert into notification(email,title,msg,status) values(?,?,?,?)',[email,title,msg,'unread']); 
    res.status(201).send('msg received');
  }
  catch(err){
    console.log('error posting notification : ' ,err.message);
    res.status(500).send('Internal Server Error');
  }
}

