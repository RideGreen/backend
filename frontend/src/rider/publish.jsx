// RidePublishedDialog.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
const Publish = () => {
const nav = useNavigate();
return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-green-900">Ride Published!</h2>
        <p className="text-gray-600 mb-4">Your ride has been successfully published. Passengers can now see and book a seat in your ride. Safe travels!</p>
        <button className="bg-green-900 text-white py-2 px-4 rounded hover:bg-green-800 transition duration-200" onClick={()=>nav('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Publish;
