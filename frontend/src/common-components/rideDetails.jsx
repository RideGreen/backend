import React, { useState , useEffect } from 'react';
import { useNavigate , useParams , useLocation} from 'react-router-dom';

import { auth } from '../Authentication/firebase';

import woman from '../assets/profile/avatar.jpg'
import man from '../assets/profile/user.png'
import mlogo from '../assets/profile/image.png';
import flogo from '../assets/profile/woman.png';
import car from '../assets/profile/car.png';
import carSeat from '../assets/profile/car-seat.png';
import instant from '../assets/utils/instant.svg';
import req from '../assets/utils/request.svg';
import book from '../assets/utils/book.svg';

import '../passenger/ride.css';

const handleProfileClick = (email , nav) => {
  console.log(email , nav);
  nav('/user-profile' , { state: { email } });
}


async function handleBooking(ride,nav,seats){
    const p_email = auth.currentUser.email;
    if(p_email === ride.email){
      alert("Can't book your own rides");
      return;
    }
    let bid=1;
        try {
          const response = await fetch("http://localhost:5000/api/booking", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({r_email : ride.email , p_email : p_email , seats : seats , isInstant : ride.isInstant , rid:ride.id})
          });

          if (response.ok) {
            const data = await response.json(); 
            bid = data.bid; 
            alert("booked successfully! " , bid);
            ride.isInstant?nav('/take-ride/search/confirm'):nav('/take-ride/search/req');
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while sending the message.");
        }

        const riderTitle = "New Ride Booking Alert";
        const user = auth.currentUser.displayName;
        const riderMsg = `Hi ${ride.name},${user} has ${ride.isInstant ? "successfully booked" : "requested"} your ride (Ride ID: ${ride.id}).\n 
        Details:\n
        - email : ${p_email}\n
        - Route: ${ride.departure} to ${ride.to}\n
        - Date: ${ride.date.split("T")[0]}\n
        Thank you for using RideGreen!`;
        const rider = {email : ride.email , title : riderTitle , msg : riderMsg };
      
        if(!ride.isInstant){
          const req = {r_email : ride.email , p_email : p_email , bid : bid, rid : ride.id , title : `Request from ${user}` , msg : `Hi ${ride.name},${user} has requested  your ride ${ride.departure} -> ${ride.to} (Ride ID: ${ride.id})`}

          fetch("http://localhost:5000/api/postride-req", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req)
          });
        }

        const passengerTitle = ride.isInstant ? "Ride Booking Success" : "Ride Request Sent";
        const passengerMsg = `Hi ${auth.currentUser.displayName}, your ride has been ${ride.isInstant ? "booked" : "requested"} with the following details:\n
        - Driver: ${ride.name}\n
        - Ride ID: ${ride.id}\n
        - Route: ${ride.departure} to ${ride.to}\n
        - Date: ${ride.date.split("T")[0]}\n
        Safe travels!`
        const passenger = {email : p_email , title : passengerTitle , msg : passengerMsg };

        fetch("http://localhost:5000/api/notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rider)
        });
        fetch("http://localhost:5000/api/notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passenger)
        });
        
}


const RideDetail = () => {
    const {rid , seats} = useParams();
    const nav = useNavigate();
    const location = useLocation();
    const { fromSearch} = location.state || {};
    const [ride , setRide] = useState([]);
    const [passenger , setPassenger] = useState([]);
   useEffect(() => {
        const fetchRide = async () => {
          try {
            // Construct the URL with query parameters
            const url = new URL(`http://localhost:5000/api/get-single-ride`);
            url.searchParams.append("rid", rid);
            const response = await fetch(url);
            
            if (response.ok) {
              const data = await response.json();
              setRide(data); 
            } else {
              console.log("Failed to fetch filtered ride.");
            }
          }catch(error){
            console.error("Error: ", error);
          }
        };
        const fetchPassenger = async () => {
          try {
            // Construct the URL with query parameters
            const url = new URL(`http://localhost:5000/api/get-passengers-ofSingle-ride`);
            url.searchParams.append("rid", rid);
            const response = await fetch(url);
            
            if (response.ok) {
              const data = await response.json();
              setPassenger(data); 
            } else {
              console.log("Failed to fetch passenger data.");
            }
          }catch(error){
            console.error("Error: ", error);
          }
        };
        fetchRide();
        fetchPassenger();
    },[]);

    const today = new Date().toISOString().split('T')[0];

    if (ride.length == 0) return null;
    return (
    <div className='flex justify-center m-7 p-6 gap-4'>
      <div className="p-4 bg-white border rounded-lg shadow-md max-w-md">
  
          <div className='userDetails flex-col justify-items-center gap-1.5 w-full' onClick={(e) => {e.stopPropagation();handleProfileClick(ride[0].email , nav)}}>
              <img src={ride[0].gender==='male'?mlogo:flogo} className='h-20'/>
              <h2 className="text-2xl font-semibold mb-2">{ride[0].name}</h2>
          </div>
  
  
          
          <div className="my-5 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">From: {ride[0].departure}</span>
              <div className="relative">
                <div className="flip-clock animate-clock">{ride[0].departureTime}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">To: {ride[0].to}</span>
              <div className="relative">
                <div className="flip-clock animate-clock">{ride[0].endTime}</div>
              </div>
            </div>
          </div>
  
  
          <div className='h-1 bg-gray-200 my-6 '></div>
          <div className='flex justify-between'>Price per passenger <strong>₹{ride[0].price}</strong></div>
          <div className='h-1 bg-gray-200 my-6 '></div>
  
          <div className='flex items-center my-5'>
              <img src={instant} alt="logo" className='h-8 mx-5'/>
              <p>{ride[0].isInstant?"Your booking will be confirmed instantly" : "Your booking won't be confirmed until the driver approves your request"}</p>
          </div>
          <div className='flex items-center my-5'>
              <img src={car} alt="car" className='h-8 mx-5'/>
              <p>{ride[0].vehicle}</p>
          </div>
          <div className='flex items-center my-5'>
              <img src={carSeat} alt="car" className='h-8 mx-5'/>
              <p>Seats Available <strong>{ride[0].seats}</strong></p>
          </div>

            
          {fromSearch && ride[0].seats !=0 &&  <button className="w-full bg-green-600 text-white font-semibold py-2 rounded shadow-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 flex items-center justify-center space-x-2 my-3" onClick={() => handleBooking(ride[0],nav,seats)}>
              <img className="h-6" src={ride[0].isInstant?book:req} alt="Request Icon" />
              <span className='ml-2'>{ride[0].isInstant?"Book":"Request to book"}</span>
          </button>}
  
  
      </div>

      <div className="p-4 bg-white border rounded-lg shadow-md min-w-96">
        <PassengerList users={passenger}/>
      </div>
    </div>
    );
  };
  
  export default RideDetail;



function PassengerList({users}) {
  const nav = useNavigate();
    return (
      <div className="min-w-96 mx-auto p-4">
        <div className='text-green-800 text-xl font-mono font-semibold my-3'>Passengers</div>
        <ul className="divide-y divide-gray-200" >
          {users.map((user) => (
            <li key={user.id} className="flex items-center py-4" onClick={(e) => {e.stopPropagation(); handleProfileClick(user.email , nav )}}>
              <img
                className="w-12 h-12 rounded-full"
                src={user.gender==='male'?man:woman}
                alt={user.name}
              />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }