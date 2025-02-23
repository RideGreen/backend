import React, { useState, useEffect } from 'react';

import {auth} from '../Authentication/firebase';



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const EnergySaved = () => {
    const [energySaved, setEnergySaved] = useState(0); // Example data

    useEffect(() => {
        const fetchData = async () => {
            try{
                const url = new URL(`${BACKEND_URL}/api/energy`);
                url.searchParams.append('email' , auth.currentUser.email);
                const res = await fetch(url);

                if(res.ok){
                    const data = await res.json();
                    setEnergySaved(data[0].energy);
                }
                else{
                    console.log('error fetching energy details');
                }
            }
            catch(err){
                console.error('error: ' , err);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-semibold mb-4">Energy Saved</h3>
            <img src="/fuel.png" alt="energy-saved" className='w-16' />
                <div className="text-black text-xl font-bold mt-5 pl-1">
                    <span>{energySaved} L</span>
                </div>
            <p className="text-gray-600 mt-2">Energy saved so far</p>
        </div>
    );
};

export default EnergySaved;
