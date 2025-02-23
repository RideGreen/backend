import React, { useState } from "react";

function PassengerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickup: "",
    dropoff: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! Check console for details.");
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border border-green-300 animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Passenger Form
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-green-300 rounded px-3 py-2 text-green-800 focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-green-300 rounded px-3 py-2 text-green-800 focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              placeholder="1234567890"
              className="w-full border border-green-300 rounded px-3 py-2 text-green-800 focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              placeholder="Enter pickup location"
              className="w-full border border-green-300 rounded px-3 py-2 text-green-800 focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Drop-off Location
            </label>
            <input
              type="text"
              name="dropoff"
              value={formData.dropoff}
              onChange={handleChange}
              placeholder="Enter drop-off location"
              className="w-full border border-green-300 rounded px-3 py-2 text-green-800 focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>

          <button
            className="w-full bg-green-600 text-white font-semibold py-2 rounded shadow-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 transform hover:scale-105 transition-transform duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default PassengerForm;
