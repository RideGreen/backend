import React from 'react';
import { useNavigate } from 'react-router-dom';
const RequestSentDialog = () => {
const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <svg className="w-6 h-6 text-orange-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Request Sent!</h2>
        <p className="text-gray-600 mb-4">Your request has been successfully sent to the rider. You will be notified once the rider accepts your request.</p>
        <button className="bg-orange-800 text-white py-2 px-4 rounded hover:bg-orange-900 transition duration-200" onClick={()=>navigate('/')}>
          Go back to Home
        </button>
      </div>
    </div>
  );
};

export default RequestSentDialog;
