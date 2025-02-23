import React,{useState , useEffect} from "react";
import { auth } from "../Authentication/firebase";
import { RideCard } from "./card";

const handleCardClick = (ride , navigate) => {
    navigate(`/ride/details/${1}/${ride.id}`);
};

const FutureRides = () => {
  const [rides , setRides] = useState([]);
  const email = auth.currentUser.email;
  useEffect(() => {
      const fetchRides = async () => {
        try {
          const url = new URL(`http://localhost:5000/api/get-future-rides`);
          url.searchParams.append("email", email);
          const response = await fetch(url);
  
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setRides(data); 
          } else {
            console.log("Failed to fetch rides.");
          }
        }catch(error){
          console.error("Error: ", error);
        }
      };
  
      fetchRides();
    }, []);

  if(rides.length >0 )
  {
      return (
        <div className="container mx-auto p-4">
          {rides.map((ride, index) => (
                <RideCard key={index} ride={ride} onClick={handleCardClick}/>
          ))}
        </div>
      );
  }
else{
  <div className="container mx-auto p-4">
      Your future rides will appear here
  </div>
}
};

export default FutureRides;
