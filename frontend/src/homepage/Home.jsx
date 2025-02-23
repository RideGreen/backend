import React from "react";
import Slider from 'react-slick';
import logo from '../assets/bg/main-bg1.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";
function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${logo})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          A Platform for <span className="text-green-400">'Safe & Secure Commute'</span>
        </h1>
        <div className="flex justify-center gap-4">
          <a
            href="/take-ride"
            className="bg-green-800 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Take Ride
          </a>
          <a
            href="/offer-ride"
            className="bg-green-800 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Offer Ride
          </a>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    icon: '/profit.png',  
    title: 'Share Cost - Save Money',
    description: 'With carpool you can split expenses between carpoolers and seekers for fuel. On average a person can save INR 50K per annum by choosing not to go alone. Apart from fuel cost you can also split parking fees, tolls and wear and tears among carpool members. Let’s save money for spending it on made in India goods.'
  },
  {
    icon: '/sustainable.png',  // Placeholder for an actual icon
    title: 'Contribution to a Sustainable Future',
    description: 'Carpooling aligns with the goal of building a more sustainable and environmentally friendly future. By choosing to carpool, individuals contribute to the reduction of greenhouse gas emissions and the preservation of natural resources. It’s a small step that collectively makes a significant impact on India’s sustainable development.'
  },
  {
    icon: '/car.png',  // Placeholder for an actual icon
    title: 'Reduction in Traffic congestion',
    description: 'By reducing the number of cars on the road, traffic congestion can also be reduced, resulting in faster journeys. As per report published 42 crore manhours are lost in Bengaluru alone. Bengaluru paying Rs 20,000 crore in lost productivity due to congestion on roads. Situation in same across major cities in India. Never-ending traffic jams are the result of small road sizes and increased car sales every year.'
  },
  {
    icon: '/teamwork.png',  // Placeholder for an actual icon
    title: 'Meet new people',
    description: 'This system promotes interaction between people who share journeys, which can strengthen social relations and create bonds between work colleagues or travel companions. Commuting alone in heavy traffic can be stressful, while carpooling offers social engagement and a shared experience, which can reduce stress and make the commute more enjoyable.'
  },
  {
    icon: '/protection.png',  // Placeholder for an actual icon
    title: 'Health benefits',
    description: 'Delhi became the most polluted city in the world with pollution 65 times above WHO acceptable limit. As per Delhi Pollution survey 7 In 10 Families have at least 1 person suffering. Air pollution killed 2.1 million in India in 2021, including over 1.6 million children under five. Let’s keep your car and bikes at home. Please use public transport or carpool now.'
  },
];

const WhyChooseCarpooling = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          So, why choose <span className="text-green-800">carpooling</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-green-800 transform transition duration-500 hover:scale-105"
            >
              {/* <div className="text-4xl text-green-500 mb-4">{reason.icon}</div> */}
              <img src={reason.icon} alt="icon" className="my-11 max-h-14 m-auto"/>
              <h3 className="text-xl font-semibold text-green-900 mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





function RideGreenServices() {
  const navigate = useNavigate();
  return (
    <section className="bg-green-900 text-white py-40">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8 text-green-600">
          RideGreen <span className="text-green-400">Services</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Offer a Ride */}
          <div
            className="bg-green-700 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-600 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9.75V6.75C3 4.95508 4.45508 3.5 6.25 3.5H17.75C19.5449 3.5 21 4.95508 21 6.75V9.75M3 9.75H21M3 9.75C3 11.6569 4.34315 13 6.25 13H17.75C19.6569 13 21 11.6569 21 9.75M6.75 13V18.25C6.75 20.0449 5.29492 21.5 3.5 21.5M17.25 13V18.25C17.25 20.0449 18.7051 21.5 20.5 21.5"
                  />
                </svg>
              </div>
              <h3 className="ml-4 text-xl font-semibold">Driving in your car soon?</h3>
            </div>
            <p>
              Share your ride with others, reduce your travel costs, and help
              create a greener planet by reducing pollution.
            </p>
            <button onClick={()=> navigate('/offer-ride')} className="px-7 py-3 mt-5 bg-slate-50 transform transition-transform hover:rotate-2 hover:scale-105 border-white rounded-2xl text-green-600 text-lg">offer ride</button>
          </div>

          {/* Take a Ride */}
          <div
            className="bg-green-700 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-600 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75h15M12 3v18M8.25 21h7.5M6 18.75l12-3.75M6 5.25l12 3.75M5.25 9.75l13.5 3.75"
                  />
                </svg>
              </div>
              <h3 className="ml-4 text-xl font-semibold">Carpool to thousands of destinations at low prices</h3>
            </div>
            <p>
              Join a ride, save on costs, and travel with ease while supporting
              a sustainable future.
            </p>
            <button onClick={()=> navigate('/take-ride')} className="px-7 py-3 mt-5 bg-slate-50 transform transition-transform hover:rotate-2 hover:scale-105 border-white rounded-2xl text-green-600 text-lg">Take a ride</button>
          </div>
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    name: 'Rahul Goel',
    text: 'It was very easy to find a taxi for the trip and at nominal rates. The booking guy was very nice and helped us a lot for the trip. It was safe and comfortable.',
  },
  {
    name: 'Aditi Sharma',
    text: 'The carpooling service was excellent. It saved me a lot of money and I met some wonderful people along the way. Highly recommended!',
  },
  {
    name: 'Vikram Singh',
    text: 'Great service! The app is user-friendly, and the rides are very affordable. I felt safe and the driver was very professional.',
  },
  {
    name: 'Priya Verma',
    text: 'Using this carpooling service has made my daily commute so much easier and cheaper. The drivers are friendly and punctual.',
  },
  {
    name: 'Pradeep Chaudhary',
    text: 'I would like to congratulate the team for their excellent service. The drivers are very professional and the rides are always on time.',
  }
];

const Testimonials = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
  
    return (
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">What Customers Say About Us</h2>
          <div className="mt-8 py-10">
            <Slider {...settings}>
              {reviews.map((review, index) => (
                <div key={index} className="flex justify-center">
                  <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl hover:bg-green-100">
                    <blockquote className="text-gray-600">
                      <p className="mb-4">"{review.text}"</p>
                      <footer className="flex items-center justify-between">
                        <div className="text-base font-medium text-green-600">{review.name}</div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    );
  }

export default function Home(){
    return(
        <>
            <HeroSection />
            <WhyChooseCarpooling />
            <RideGreenServices />
            <Testimonials />
        </>
    )
}