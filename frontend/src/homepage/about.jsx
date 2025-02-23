import React from 'react';


const HowItWorks = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-green-700 mt-20 mb-10">How Ride Green Works</h2>
      <div className="space-y-4">
        <div className="bg-green-100 p-4 rounded-lg shadow-md transition-transform ">
          <div className="flex items-start space-x-3">
            <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-1">Register with Ride Green</h3>
              <p className="text-gray-700">
                Create your account and get verified quickly. Start your eco-friendly commuting journey with us.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md ">
          <div className="flex items-start space-x-3">
            <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-1">Set Up Your Green Pool</h3>
              <p className="text-gray-700">
                Enter your route details and find drivers or riders who match your schedule. Our platform makes it easy to connect.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md ">
          <div className="flex items-start space-x-3">
            <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-1">Start Searching for Matches</h3>
              <p className="text-gray-700">
                Use our real-time matching system to find a carpool partner and reduce your travel costs and stress.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md ">
          <div className="flex items-start space-x-3">
            <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">4</div>
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-1">Begin Your Journey Together</h3>
              <p className="text-gray-700">
                Connect with your match, coordinate your ride, and start your journey toward greener living.
              </p>
            </div>
          </div>
        </div>
      </div>
      </>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-green-50 p-20 text-lg">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-20">
        <h1 className="text-4xl font-bold text-green-700 mb-10">
          About Ride Green – A Revolution in Eco-Friendly Transportation
        </h1>
        <p className="text-gray-700 mb-6">
        RideGreen is a carpooling app that helps drivers and commuters share rides easily. By connecting people traveling in the same direction, it makes commuting more affordable, reduces traffic, and helps the environment.
        </p>
        <p className="text-gray-700 mb-6">With RideGreen, you can find nearby rides, share travel costs, and enjoy a hassle-free journey. Whether you're a driver with empty seats or someone looking for a ride, our platform makes carpooling simple, safe, and convenient.</p>
        <p className="text-gray-700 mb-6">Start sharing rides today and make your daily commute better with RideGreen!</p>

        <h2 className="text-3xl font-bold text-green-700 mb-10 mt-20">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg shadow-md text-center py-8 px-4 transition-transform hover:translate-y-3">
            <h3 className="text-2xl font-semibold text-green-700 mb-2 text-center">Reducing Pollution</h3>
            <p className="text-gray-700 text-lg py-4">
              Carpooling reduces the number of cars on the road, cutting down harmful vehicle emissions that contribute to global pollution and climate change. Join us in making a positive impact on the environment.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md text-center py-8 px-4 transition-transform hover:translate-y-3">
            <h3 className="text-2xl font-semibold text-green-700 mb-2">Cutting Traffic Congestion</h3>
            <p className="text-gray-700 py-4 text-lg">
              Less traffic means fewer delays and more stress-free commuting. Carpooling helps in reducing traffic congestion, making daily commutes faster and more efficient.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md text-center py-8 px-4 transition-transform hover:translate-y-3">
            <h3 className="text-2xl font-semibold text-green-700 mb-2">Lowering Driving Stress</h3>
            <p className="text-gray-700 py-4 text-lg">
            Sharing rides not only saves time but also allows drivers to take a break from the stress of long, monotonous journeys. Let’s make commuting fun and relaxed.
            </p>
          </div>
        </div>
        <HowItWorks />
      </div>

    </div>
  );
};

export default About;
