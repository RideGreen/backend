import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


import { auth } from "../Authentication/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../homepage/loading";

const Form = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    seats: 1,
    price: 0,
    date: new Date(),
    time: '',
    vehicleType: "",
    vehicleDetails: "",
    instantBooking: false
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

  const today = new Date().toISOString().split("T")[0];

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'date') {
      if (formData.date === today) {
        const currentTime = new Date().toTimeString().split(" ")[0].slice(0, 5); // Current time in HH:MM format
        document.getElementById("time").setAttribute("min", currentTime);
      } else {
        // No time restrictions for future dates
        document.getElementById("time").removeAttribute("min");
      }
    }
  };


  const handleToggle = () => {
    setFormData({ ...formData, instantBooking: !formData.instantBooking });
  };

  const [cities] = useState([
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
    "Udupi"
  ]);

  const [filteredDepartureCities, setFilteredDepartureCities] = useState(cities);
  const [filteredDestinationCities, setFilteredDestinationCities] = useState(cities);

  const [showDropdown, setShowDropdown] = useState({
    departure: false,
    destination: false,
  });


  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowDropdown({ departure: false, destination: false });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = (e, type) => {
    const searchTerm = e.target.value.toLowerCase();
    if (type === "departure") {
      setFormData({ ...formData, departure: e.target.value });
      setFilteredDepartureCities(
        cities.filter((city) => city.toLowerCase().includes(searchTerm))
      );
    } else if (type === "destination") {
      setFormData({ ...formData, destination: e.target.value });
      setFilteredDestinationCities(
        cities.filter(
          (city) =>
            city.toLowerCase().includes(searchTerm) &&
            city !== formData.departure
        )
      );
    }
    setShowDropdown({ ...showDropdown, [type]: true });
  };

  const handleSelect = (type, value) => {
    if (type === "departure") {
      setFormData({ ...formData, departure: value });
      setFilteredDestinationCities(cities.filter((city) => city !== value));
    } else if (type === "destination") {
      setFormData({ ...formData, destination: value });
    }
    setShowDropdown({ ...showDropdown, [type]: false });
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.departure && formData.destination;
    }
    if (step === 2) {
      return formData.seats > 0 && formData.price > 0;
    }
    if (step === 3) {
      return formData.vehicleDetails.trim() !== "";
    }
    return true;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
    } else {
      alert("Please fill all the required fields.");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('submit button clicked');
    const departureCoords = await getCoordinates(formData.departure);
    const destinationCoords = await getCoordinates(formData.destination);
    console.log(departureCoords, " ", destinationCoords);
    let distance;
    if (departureCoords && destinationCoords) {
      distance = await calculateDistance(departureCoords, destinationCoords);
      console.log(distance);
      setFormData((prev) => ({
        ...prev,
      }));
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/offer-ride`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, distance: parseFloat(distance), email: user.email }),
      });

      if (response.ok) {
        navigate("/offer-ride/publish");
      } else {
        alert("Failed to post the ride.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while posting the ride.");
    }


    console.log('rideData :', { ...formData, distance: parseFloat(distance), email: user.email });
  };


  const getCoordinates = async (location) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      console.log(lat, ": lat , lon :  ", lon);
      return { lat, lon };
    } else {
      console.error('Error fetching coordinates');
      return null;
    }
  };

  const calculateDistance = async (departureCoords, destinationCoords) => {
    const { lat: depLat, lon: depLon } = departureCoords;
    const { lat: destLat, lon: destLon } = destinationCoords;

    const url = `http://router.project-osrm.org/route/v1/driving/${depLon},${depLat};${destLon},${destLat}?overview=false`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes[0]) {
      const distanceInMeters = data.routes[0].legs[0].distance; // Distance in meters
      const distanceInKm = (distanceInMeters / 1000).toFixed(2); // Convert to kilometers
      console.log(distanceInKm);
      return distanceInKm;
    } else {
      console.error('Error calculating distance');
      return null;
    }
  };
  if (loading) {
    return (<Loader />)
  }


  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <form
          onSubmit={step === 4 ? handleSubmit : handleNextStep}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        >
          <Link to={"/"} className="flex flex-col items-center m-5">
            <img src="/main-logo.png" alt="logo" className="rounded-full h-12 justify-center" />
          </Link>
          <h2 className="text-2xl font-semibold mb-6 text-green-600">
            Offer Ride
          </h2>

          {step === 1 && (
            <>
              {/* Pick-up Location */}
              <div className="mb-4 dropdown-container relative">
                <label className="block text-gray-700">Pick-up Location</label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Search pick-up location"
                  value={formData.departure}
                  onClick={() => setShowDropdown({ ...showDropdown, departure: true, destination: false })}
                  onChange={(e) => handleSearch(e, "departure")}
                  required
                />
                {showDropdown.departure && (
                  <div className="absolute w-7/12 bg-white border rounded-lg mt-1 w-full max-h-40 overflow-auto z-10">
                    {filteredDepartureCities.map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                        onClick={() => handleSelect("departure", city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drop-off Location */}
              <div className="mb-4 dropdown-container relative">
                <label className="block text-gray-700">Drop-off Location</label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Search drop-off location"
                  value={formData.destination}
                  onClick={() => setShowDropdown({ ...showDropdown, destination: true, departure: false })}
                  onChange={(e) => handleSearch(e, "destination")}
                  required
                />
                {showDropdown.destination && (
                  <div className="absolute w-7/12 bg-white border rounded-lg mt-1 w-full max-h-40 overflow-auto z-10">
                    {filteredDestinationCities.map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                        onClick={() => handleSelect("destination", city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="date"
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                name="date"
                min={today}
                onChange={handleChange}
                required
              />
              <input
                id="time"
                type="time"
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                name="time"
                // min={formData.date === today ? new Date().toTimeString().split(" ")[0].slice(0, 5)  : ""}
                min={formData.date === today ? new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 5) : ""}
                onChange={handleChange}
                required
              />

              {/* Next Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 mt-2"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Seats Available</label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={(e) =>
                    setFormData({ ...formData, seats: Number(e.target.value) })
                  }
                  min="1"
                  className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price per Seat</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  min="50"
                  className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Next
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Vehicle type</label>
                <input
                  type="text"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="(eg., car,bike)"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Vehicle Name</label>
                <input
                  type="text"
                  name="vehicleDetails"
                  value={formData.vehicleDetails}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="(eg., MG hector,fortuner)"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Next
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-3">Instant Booking</label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="instantBooking"
                    id="instantBooking"
                    checked={formData.instantBooking}
                    onChange={handleToggle}
                    className="checked:bg-green-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="instantBooking"
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                By enabling instant booking, passengers can immediately book a seat without waiting for your approval. Otherwise, each booking request will require your confirmation.
              </p>
              <button
                type="submit"
                // onClick={()=>navigate('/offer-ride/publish')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Submit
              </button>
            </>
          )}
        </form>
      </div>
    );
  }
  else {
    return (
      <div className="flex-col content-center justify-items-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-green-900">Please <Link to='/login' className="text-black underline">login</Link> before posting a ride</h1>
        <h3 className="text-green-800">You'll be redirected to login page in 1mins..</h3>
      </div>
    );
  }
};

export default Form;
