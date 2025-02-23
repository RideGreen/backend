import React from "react";
import { useNavigate } from "react-router-dom";


import mlogo from '../assets/profile/image.png';
import flogo from '../assets/profile/woman.png';
import car from '../assets/profile/car.png';
import instant from '../assets/utils/instant.svg';

const Card = ({title , message , onClick}) => {
    return(
    <>
        <div className="flex justify-between">
            <h4 className="font-semibold text-green-800">{title}</h4>
            <button
            className="text-green-500 hover:text-green-700 font-bold"
            name="denied"
            onClick={onClick}
            >
            ×
            </button>
        </div>
        <p className="text-green-700">{message}</p>
    </>
    )
}

export default Card;


export const RideCard = ({ride , onClick}) => {
    const navigate = useNavigate();
    const { name, departureTime, departure,  to, price, seats, isInstant, vehicle , endTime , gender , date } = ride;
    const Date = date.split('T')[0];
    let clr = seats === 0 ? 'gray' : 'green';
    const from = departure;
    return (
      <div
        onClick={() => onClick(ride,navigate)} 
        className={ "flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-md  mx-80 cursor-pointer m-3" }
      >
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={gender=='male'? mlogo : flogo}
            alt="Profile"
            className={`w-12 h-12 rounded-full border border-${clr}-300`}
          />
        </div>
  
        {/* Ride Details */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            {/* Name */}
            <h3 className={`text-lg font-semibold text-${clr}-800`}>{name}</h3>
            <h4 className={`font-semibold text-${clr}-800`}>{seats === 0 ? 'Full' : seats}</h4>
          </div>
  
          {/*Timing and Locations*/}
          <div className="mt-2">
            <p className={`text-sm text-${clr}-600`}>
              <span className={`font-medium text-${clr}-700`}>{departureTime}</span> – {from}
            </p>
            <p className={`text-sm text-${clr}-600`}>
              <span className={`font-medium text-${clr}-700`}>{endTime}</span> – {to}
            </p>
            <p className={`text-${clr}-700 my-3`}>
              <span className={`font-medium text-${clr}-700 text-lg`}>{Date}</span>
            </p>
          </div>
  
          {/* Pricing */}
          <div className="flex justify-between items-center">
            <p className={`text-lg font-bold text-${clr}-700`}>₹{price}</p>
            
            <img
              src={car}
              alt="Car"
              className={`w-10 h-10 rounded-full border border-${clr}-300 ml-auto`}
            />
            <p className={`text-rg text-${clr}-700 ml-2`}>{vehicle}</p>
  
            {isInstant ? <img src={instant} className="w-6 m-1 rounded-full" /> : ''}
          </div>
        </div>
      </div>
    );
  };