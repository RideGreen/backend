import { auth } from '../Authentication/firebase';
import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const CO2 = () => {
    const [co2Reduced, setCo2Reduced] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = new URL(`${BACKEND_URL}/api/co2`);
                url.searchParams.append('email', auth.currentUser.email);
                const res = await fetch(url);

                if (res.ok) {
                    const data = await res.json();
                    // console.log(data);
                    setCo2Reduced(data[0].reduced); // Assuming API response has reduced in first index
                } else {
                    console.log('Error fetching CO2 details');
                }
            } catch (err) {
                console.error('Error:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-semibold mb-4">CO2 Emissions Reduced</h3>
            <img src="/co2.png" alt="energy-saved" className='w-16' />
                <div className="text-black text-xl font-bold mt-5 pl-1">
                    <span>{co2Reduced} L</span>
                </div>
            <p className="text-gray-600 mt-2">CO2 conserved so far</p>
        </div>
    );

};

export default CO2;
