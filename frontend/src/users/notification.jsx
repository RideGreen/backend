

import React, { useState, useEffect } from "react";
import { auth } from "../Authentication/firebase";
import Loader from "../homepage/loading";
import Card from "./card";

const NotificationCard = ({ title, message, nid , fetchReq}) => {

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/deleteNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nid : nid }),
      });

      alert('Notification deleted!');
      fetchReq();
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md flex flex-col space-y-2 m-2">
      <Card message={message} title={title} onClick={handleRequest}/>
    </div>
  );
};

const NotificationList = () => {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReq = async () => {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error("User is not logged in or email is unavailable.");
      }

      const url = new URL(`http://localhost:5000/api/get-notification`);
      url.searchParams.append("email", auth.currentUser.email);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch request: ${response.statusText}`);
      }

      const data = await response.json();
      setNotification(data); 
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
        <h2 className="text-green-800 text-center text-5xl font-mono font-semibold">Notifications</h2>
        {notification.length>0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 gap-x-8 m-5">
          {notification.map((notif) => (
            <NotificationCard
              key={notif.id}
              nid={notif.id}
              title={notif.title}
              message={notif.msg}
              email={notif.email}
              fetchReq={fetchReq}
            />
          ))}
        </div>}
        {notification.length==0 && <div className="flex min-h-96 justify-center items-center">
          <div className="text-green-800 text-center text-xl font-semibold align-center">No notifications!</div>
        </div>}
      </div>
    );
  }
};

export default NotificationList;
