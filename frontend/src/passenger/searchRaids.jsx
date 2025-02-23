import React, { useState , useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";

import { auth } from "../Authentication/firebase";
import {  onAuthStateChanged } from "firebase/auth"; 

import Loader from "../homepage/loading";


export default function RideForm() {

  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();
  const cities = [
    "Bangalore",
    "Mysore",
    "Mangalore",
    "Hubli",
    "Belgaum",
    "Shimoga",
    "Davanagere",
    "Gulbarga",
    "Bellary",
    "Tumkur",
    "Udupi",
    "Bijapur",
    "Mandya",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
  ];
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    passengers: 1,
  });

  const [user, setUser] = useState(null); // Store user data here
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser); 
        setLoading(false);
      });
  
      return () => unsubscribe(); 
    }, [auth]);

    useEffect(() => {
      if (!user) {
        const timeoutId = setTimeout(() => {
          navigate("/login");
        }, 10000);
  
        return () => clearTimeout(timeoutId); // Clean up the timeout if the component unmounts
      }
    }, [user, navigate]);
  
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirect to the search results page with the query parameters
    const { from, to, date, time ,passengers } = formData;
    navigate(
      `/take-ride/search?from=${from}&to=${to}&date=${date}&seats=${passengers}&time=${time}`
    );
    // navigate(
    //   `/take-ride/search?from=${from}&to=${to}&date=${date}&time=${time}`
    // );
  };
  if(loading){
    return(<Loader/>)
  }
  if(user)
  {return (
    <div className="flex flex-col items-center justify-center text-center text-white h-full bg-green-900 pb-10">
      <button
        className="text-green-800 bg-white border self-start rounded m-7 px-4 py-2 hover:bg-green-100"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
      <h1 className="text-4xl md:text-5xl font-bold">
        Outstation rides at <span className="text-lime-500">your fare</span>
      </h1>
      <p className="mt-4 text-lg">
        Explore hundreds of intercity routes. Suggest your price and choose one
        of our verified drivers.
      </p>

      {/* Form */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-md">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center text-green-800"
          onSubmit={handleSubmit}
        >
          {/* From City Dropdown */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="from" className="block text-gray-700 font-medium">
              From city
            </label>
            <select
              id="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-lime-500"
              required
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* To City Dropdown */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="to" className="block text-gray-700 font-medium">
              To city
            </label>
            <select
              id="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-lime-500"
              required
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="date" className="block text-gray-700 font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              min={today} 
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-lime-500"
              required
            />
          </div>

          {/* Time */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="time" className="block text-gray-700 font-medium">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              min={formData.date === today ? new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 5) : ""}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-lime-500"
              required
            />
          </div>

          {/* Passengers */}
          <div className="col-span-2">
            <label
              htmlFor="passengers"
              className="block text-gray-700 font-medium"
            >
              Passengers
            </label>
            <input
              type="number"
              id="passengers"
              min="1"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-lime-500"
              required
            />
          </div>

          {/* Find a Driver Button */}
          <div className="col-span-full md:col-span-2 self-center justify-self-center">
            <button
              type="submit"
              className="w-full bg-green-900 text-white font-bold py-3 my-4 px-6 rounded-lg hover:bg-green-500 transition"
            >
              Find rides
            </button>
          </div>
        </form>
      </div>
    </div>
  );}
  else{
    return(
      <div className="flex-col content-center justify-items-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-green-900">Please <Link to='/login' className="text-black underline">login</Link> before taking a ride</h1>
        <h3 className="text-green-800">You'll be redirected to login page in 1mins..</h3>
      </div>
  );
  }
}
