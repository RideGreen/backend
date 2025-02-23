import { useState, useEffect } from "react";

import { auth } from "../Authentication/firebase";

import man from '../assets/profile/user.png';
import logo from "../assets/profile/avatar.jpg";
import Loader from "../homepage/loading";
import CO2 from "./co2";
import EnergySaved from "./energy";


const Profile = () => {
  const email = auth.currentUser.email;
  const [user, setUser] = useState(null); // Store user data here
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  useEffect(() => {
    const fetchData = async () => {
      try {
          const url = new URL(`${BACKEND_URL}/api/user-data`);
          url.searchParams.append('email', email);
          const res = await fetch(url);

          if (res.ok) {
              const data = await res.json();
              // console.log(data);
              setUser(data[0]); 
          } else {
              console.log('Error fetching user details');
          }
      } catch (err) {
          console.error('Error:', err);
      }
    }
    
    fetchData(); // Cleanup the listener on component unmount
  }, [auth]);

  return (
    <>
   {user ? (
    <div className="h-screen bg-white flex-col justify-center items-center gap-10">
      <div className="border shadow-lg p-5 m-10 rounded flex-col content-center justify-items-center gap-3">
        
        <>
        <div className="m-5 self-center mb-4">
          <h3 className="m-4">Profile Photo</h3>
          <img
            src={user.gender== 'male'?man:logo} // Display user photo or fallback logo
            alt="Profile"
            className="w-20 h-20 rounded-full m-auto"
          />
        </div>
            <h1 className="text-2xl mb-6 font-semibold">{user.name}</h1>
            <div className="bg-gray-200 w-full h-2"> </div>
            <p className="m-3">Age: <span className="font-semibold">{user.age}</span></p>
            <p className="m-3">Phone: <span className="font-semibold">{user.phone}</span></p>
            <p className="m-3">Email: <span className="font-semibold">{user.email}</span></p>
        
        </>
        
      </div>
      <div className="flex justify-around m-10">
        <CO2 />
        <EnergySaved />
      </div>
    </div>
    ) : (
          <Loader />
        )}
    </>
  );
};

export default Profile;
