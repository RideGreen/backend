const db = require('../data/initialize');


exports.postContactData = async (req, res) => {
    const contactDetails = req.body;
    try{
      await db.execute('insert into contact(fname,lname,email,phone,msg) values(?,?,?,?,?)',[contactDetails.fname , contactDetails.lname,contactDetails.email , contactDetails.phone,contactDetails.msg]);
  
      // console.log('Form submitted with data:', contactDetails);
      res.status(201).send('msg received');
    }
    catch(err){
      console.log('database error,please try again',err.message);
    }
};
exports.createUser = async (req, res) => {
    // console.log(req.body);
    const {name , email , phone , age , gender} = req.body;
    try{
      await db.execute('insert into user(name,email,phone,age,gender) values(?,?,?,?,?)',[name, email, phone || '7674375927' ,age || '21' , gender || 'female']);
      res.status(201).send('msg received');
    }
    catch(err){
      console.log('database error: ',err.message);
    }
};

exports.postRide = async (req, res) => {
  const { departure, destination, seats, price, date, time, vehicleType, vehicleDetails, instantBooking, distance, email } = req.body;

  // Calculate expected time and duration
  const expTime = distance / 70.0; // Assuming 70 km/h average speed
  const hours = Math.floor(expTime);
  const minutes = Math.floor((expTime * 60) % 60);
  const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  // Calculate end time
  const timeAdd = (startTime, duration) => {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [durationHours, durationMinutes] = duration.split(':').map(Number);

      let endHours = startHours + durationHours;
      let endMinutes = startMinutes + durationMinutes;

      if (endMinutes >= 60) {
          endHours += Math.floor(endMinutes / 60);
          endMinutes %= 60;
      }
      endHours %= 24; // Handle overflow for hours

      return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  const endTime = timeAdd(time, duration);

  try {
      // Insert into the database
      await db.execute(
          'INSERT INTO ride (departure, destination, seats, price, date, time, vehicleType, vehicleDetails, instantBooking, distance, email, avail_seat, duration, endTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [departure, destination, seats, price, date, time, vehicleType, vehicleDetails, instantBooking, distance, email, seats, duration, endTime]
      );

      res.status(201).send('Ride posted successfully');
  } catch (err) {
      console.error('Database error:', err.message);
      res.status(500).send('An error occurred while posting the ride');
  }
};



exports.postBooking = async (req, res) => {
    // console.log(req.body);
    const {r_email , p_email , seats , isInstant , rid} = req.body;
    try{
      const [avail_seat] = await db.execute('select avail_seat from ride where rid=?',[rid]);
      const avail = avail_seat[0].avail_seat
      const bookedSeats = Math.min(seats , avail);
      const status = isInstant?'accepted':'requested';
      await db.execute('insert into booking(r_email , p_email , seats , status,rid) values(?,?,?,?,?)',[r_email,p_email,bookedSeats,status,rid]);
      const [bid] = await db.execute('select max(bid) as bid from booking');
      try{
        if(isInstant) updateSeatsInRide(bookedSeats , rid);
      }
      catch(err){
        console.error(err);
      }
      // console.log('submitted data:', r_email,p_email,seats,isInstant , bid[0]);
      res.status(201).json(bid[0]);
    }
    catch(err){
      console.log('database error in posting: ',err.message);
    }
};


exports.getRide = async (req, res) => {
  const { to , from , date } = req.query;  // Get the parameter from the query string

  // console.log(to,from,date);
  if (!to || !from || !date) {
    return res.status(400).send('Parameter is required');
  }
  
  // const query = 'SELECT name,email,user_id from user';
  const query = 'SELECT r.rid as id , r.departure as departure, r.destination as `to`,r.avail_seat as seats , r.price , r.time as departureTime , r.instantBooking as isInstant,r.date,r.vehicleDetails as vehicle,r.email,r.duration,r.endTime, u.name , u.gender FROM ride r inner join user u on u.email = r.email where r.departure = ? and r.destination = ? and r.date = ? and r.status="sessioned"';

  //and (r.date != curdate() OR r.time > curtime()) 

  try {
    const [results] = await db.execute(query ,[from ,to,date]);
    // console.log('Results:', results);
    res.json(results);  // Send the fetched data as JSON response
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}

exports.postNotification = async (req , res) => {
  // console.log(req.body);
  const {email , title , msg } = req.body;
  try{
    await db.execute('insert into notification(email,title,msg) values(?,?,?)',[email,title,msg]); 
    res.status(201).send('msg received');
  }
  catch(err){
    console.log('error posting notification : ' ,err.message);
    res.status(500).send(err.message);
  }
}

exports.getNotification = async (req, res) => {
  const  email = req.query.email;
  console.log(email);
  if (!email) {
    return res.status(400).send('Parameter is required');
  }
  const query = 'SELECT nid as id , title , msg from notification where email=? order by arrivedAt desc';
  try {
    const [results] = await db.execute(query ,[email]);
    //console.log('Notifications:', results);
    res.json(results);  // Send the fetched data as JSON response
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send(err.message);
  }
}


exports.postRideReq = async (req , res) => {
  // console.log(req.body);
  const {r_email,p_email , title , msg ,bid ,rid} = req.body;
  try{
    await db.execute('insert into ride_req(r_email,p_email,title,msg,bid,rid) values(?,?,?,?,?,?)',[r_email,p_email,title,msg,bid,rid]); 
    res.status(201).send('msg received');
  }
  catch(err){
    console.log('error posting ride request : ' ,err.message);
    res.status(500).send('Internal Server Error');
  }
}

exports.getRideReq = async (req, res) => {
  const  {email} = req.query;
  // console.log(email);
  if (!email) {
    return res.status(400).send('Parameter is required');
  }
  
  const query = 'SELECT req_id as id , title , msg , p_email, rid ,bid from ride_req where r_email=?';
  try {
    const [results] = await db.execute(query ,[email]);
    // console.log('Notifications:', results);
    res.json(results);  // Send the fetched data as JSON response
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}

exports.handleRequest = async(req , res) => {
      // console.log(req.body);
      const {bid , state , req_id , rid} = req.body;
      const query = 'update booking set status=? where bid=?';
      try{
        const [affected] = await db.execute('select seats from booking where bid=?',[bid]);
        await db.execute(query,[state,bid]);
        const seats = affected[0]?.seats;
        await db.execute('update ride_req set status="replied" where req_id=?',[req_id]);
        try{
          if(state === 'accepted') updateSeatsInRide(seats , rid);
        }
        catch(err){
          console.error(err);
        }
        db.execute('delete from ride_req where req_id=? and status="replied"',[req_id]);
        res.status(200).json({ message: 'Request handled successfully' });
      }catch(err){
        console.log('error replying : ' ,err.message);
        res.status(500).send('Internal Server Error');
      }

}

exports.deleteNotification = async (req , res) => {
    // console.log(req.body);
    const nid = req.body.nid;
    try{
      await db.execute('delete from notification where nid=?',[nid]);
      res.status(201).send('deleted!');
    }catch(err){
      console.log('error deleting : ' ,err.message);
      res.status(500).send('Internal Server Error');
    }
}


const updateSeatsInRide = async (bookedS , rid) => {
      await db.execute('update ride set avail_seat=(avail_seat-?) where rid=?',[bookedS , rid]);
}



exports.getFutureRides = async (req, res) => {
  const { email } = req.query;  

  // console.log(email);
  if (!email) {
    return res.status(400).send('Parameter is required');
  }
  
  // const query = 'SELECT name,email,user_id from user';
  const query = `
  SELECT 
    r.rid AS id,
    CONVERT_TZ(r.date, '+00:00', @@session.time_zone) AS date, 
    r.departure, 
    r.destination AS \`to\`, 
    r.avail_seat AS seats, 
    r.price, 
    r.time AS departureTime, 
    r.instantBooking AS isInstant,
    r.vehicleDetails AS vehicle, 
    r.email, 
    r.duration, 
    r.endTime, 
    u.name,
    u.gender
  FROM 
    ride r
  INNER JOIN 
    user u 
    ON u.email = r.email
  LEFT JOIN 
    booking b 
    ON r.rid = b.rid
    AND b.p_email != r.email
    AND b.status = 'accepted'
  WHERE 
    r.email = ? OR b.p_email = ? 
  GROUP BY 
    r.rid
`;

  try {
    const [results] = await db.execute(query ,[email,email]);
   // console.log('Results:', results);
    res.json(results);  // Send the fetched data as JSON response
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}
exports.getSingleRide = async (req, res) => {
  const { rid } = req.query;
  if (!rid) {
    return res.status(400).send('Parameter is required');
  }

  const query = 'SELECT r.rid as id, r.date , r.departure, r.destination as `to`,r.avail_seat as seats , r.price , r.time as departureTime , r.instantBooking as isInstant,r.vehicleDetails as vehicle,r.vehicleType,r.email,r.duration,r.endTime, u.name , u.gender  FROM ride r inner join user u on u.email = r.email where r.rid=?';
  try {
    const [results] = await db.execute(query ,[rid]);
    // console.log('Results:', results);
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}
exports.getSingleRidePassengers = async (req, res) => {
  const { rid } = req.query;
  if (!rid) {
    return res.status(400).send('Parameter is required');
  }

  const query = 'SELECT user_id as id , name , email , gender from user where email in(select p_email from booking where rid=?)';
  try {
    const [results] = await db.execute(query ,[rid]);
    // console.log('Results:', results);
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}
exports.getUserData = async (req, res) => {
  const { email } = req.query;
  console.log('email: ',email);
  if (!email) {
    return res.status(400).send('Parameter is required');
  }

  const query = 'SELECT user_id as id , name , email , gender , age ,phone from user where email=?';
  try {
    const [results] = await db.execute(query ,[email]);
    //console.log('Results:', results);
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}
exports.getEnergyData = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send('Parameter is required');
  }

  const query = 'SELECT fuel_saved as energy from energy_con where email=?';
  try {
    const [results] = await db.execute(query ,[email]);
    if(results.length == 0){
      return res.json([{energy : 0}]);
    }
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}
exports.getCo2Data = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send('Parameter is required');
  }

  const query = 'SELECT reduced from co2 where email=?';
  try {
    const [results] = await db.execute(query ,[email]);
    if(results.length == 0){
      return res.json([{reduced : 0}]);
    }
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
}