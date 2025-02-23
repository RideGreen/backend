

import React, { useState, useEffect } from "react";
import { auth } from "../Authentication/firebase";
import Loader from "../homepage/loading";
import Card from "./card";

const RequestCard = ({ title, message, p_email, bid, reqId, rid, fetchReq }) => {

  const handleRequest = async (e) => {
    console.log(bid);
    e.preventDefault();
    const name = e.target.name;
    const passengerTitle = `Request ${name}`;
    const passengerMsg = `Hello!, your ride has been ${name} by ${auth.currentUser.displayName}:\n
    - Driver: ${auth.currentUser.displayName}\n
    - email: ${auth.currentUser.email}
    ${name === 'accepted' ? 'Safe travels!' : 'We encourage you to explore other available options for your journey. Thank you for understanding!'}`;
    
    const passenger = { email: p_email, title: passengerTitle, msg: passengerMsg };

    try {
      await fetch("http://localhost:5000/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passenger),
      });

      await fetch("http://localhost:5000/api/handleRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bid: bid, state: name, req_id: reqId, rid: rid }),
      });

      alert('Thank you for responding!');
      fetchReq();
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md flex flex-col space-y-2 m-2">
      <Card message={message} title={title} handleRequest={handleRequest}/>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
          name="accepted"
          onClick={handleRequest}
        >
          Accept
        </button>
        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-4 rounded"
          name="denied"
          onClick={handleRequest}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

const RequestList = () => {
  const [req, setReq] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReq = async () => {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error("User is not logged in or email is unavailable.");
      }

      const url = new URL(`http://localhost:5000/api/get-ride-req`);
      url.searchParams.append("email", auth.currentUser.email);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch request: ${response.statusText}`);
      }

      const data = await response.json();
      setReq(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching request:", error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReq(); // Fetch the data initially
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-green-800 text-center text-5xl font-mono font-semibold">Ride requests</h2>
        {req.length>0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 gap-x-8 m-5">
          {req.map((req) => (
            <RequestCard
              key={req.id}
              reqId={req.id}
              title={req.title}
              message={req.msg}
              p_email={req.p_email}
              bid={req.bid}
              rid={req.rid}
              fetchReq={fetchReq} // Pass fetchReq to RequestCard
            />
          ))}
        </div>}
        {req.length==0 && <div className="flex min-h-96 justify-center items-center">
          <div className="text-green-800 text-center text-xl font-semibold align-center">No ride requests!</div>
        </div>}
      </div>
    );
  }
};

export default RequestList;
