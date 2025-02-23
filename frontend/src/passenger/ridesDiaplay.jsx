import React, { useState , useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';

import { auth } from '../Authentication/firebase';
import { RideCard } from '../users/card';


import './ride.css';
import Loader from '../homepage/loading';



const BACKEND_URL = 'https://ridegreen.onrender.com';
const RideList = () => {

  const navigate = useNavigate();
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const date = queryParams.get("date");
  const seats = queryParams.get("seats");
  const time = queryParams.get("time");


  const email = auth.currentUser.email;


  const [rides, setRides] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the URL with query parameters
        const url = new URL(`${BACKEND_URL}/api/get-rides`);
        url.searchParams.append("to", to);
        url.searchParams.append("from", from);
        url.searchParams.append("date", date);
        url.searchParams.append("email", email);
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setRides(data); 
        } else {
          console.log("Failed to fetch filtered rides.");
        }
      }catch(error){
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, [from,to, date]);
  
  const handleCardClick = (ride) => {
    navigate(`/ride/details/${seats}/${ride.id}`, { state: { fromSearch: true } });
  };
  
 
  if(rides == null){
    return <Loader />
  }
  
  
  else{
  return (
    <>
      <button className="bg-green-800 text-white border rounded mt-6 ml-6 px-4 py-2 hover:bg-green-100" onClick={()=>navigate('/')}>Back to Home</button>
      <button className="bg-green-800 text-white border rounded mt-6 ml-6 px-4 py-2 hover:bg-green-100" onClick={()=>navigate(-1)}>Go back</button>
        { rides.length > 0 && (
          <div className="flex justify-center m-7 items-center">
            <div className='min-w-full flex-col'>
                {rides.map((ride, index) => (
                  <RideCard key={index} ride={ride} onClick={handleCardClick}/>
                ))}

            </div>
          </div>
          )}
        {
            rides.length === 0 && (
            <div className="flex-col justify-items-center min-h-full my-44 space-x-4 items-center">
              <h2 className="text-3xl my-4">There are no rides yet for {date} between these cities</h2>
              <h4 className="text-xl my-4">{from}  &rarr; {to}</h4>
              <button className="bg-green-800 text-white border rounded mt-6 ml-6 px-4 py-2 hover:bg-green-100" onClick={()=>navigate('/offer-ride')}>Create a ride</button>
            </div>
          )
        } 
    </>
  );
}
};

export default RideList;