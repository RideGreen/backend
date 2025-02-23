import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is RideGreen?",
      answer:
        "RideGreen is a platform that connects people looking to share rides, either by offering or taking a carpool, to reduce traffic congestion and pollution.",
    },
    {
      question: "How do I offer a ride on RideGreen?",
      answer:
        "To offer a ride, create an account, log in, and post your trip details including your destination, date, time, and available seats.",
    },
    {
      question: "How do I find a ride to my destination?",
      answer:
        "Search for rides by entering your destination, date, and time on the RideGreen platform. You can filter results to find the most suitable options.",
    },
    {
      question: "Is RideGreen safe for users?",
      answer:
        "Safety is our priority. We verify profiles, encourage users to check reviews, and provide in-app communication for secure coordination.",
    },
    {
      question: "What are the benefits of carpooling through RideGreen?",
      answer:
        "Carpooling helps reduce fuel costs, lowers traffic congestion, minimizes your carbon footprint, and provides an opportunity to meet new people.",
    },
    {
      question: "How is pricing decided for carpooling trips?",
      answer:
        "Drivers set the price for their rides based on the distance and other factors. Passengers can view the price before booking.",
    },
    {
      question: "Can I cancel my booking or offered ride?",
      answer:
        "Yes, both drivers and passengers can cancel rides. However, please review our cancellation policy for details on refunds and charges.",
    },
    {
      question: "What should I do if there’s an issue during the ride?",
      answer:
        "If you face any issues during the ride, you can report them through our support system or contact our customer service team.",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-green-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-green-300 rounded shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-4 py-3 text-green-800 font-medium flex justify-between items-center"
              >
                {faq.question}
                <span
                  className={`transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3 text-green-700 bg-green-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
