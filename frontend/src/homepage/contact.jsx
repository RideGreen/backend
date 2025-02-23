import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [contactData , setData] = useState({fname : '' , lname : '' , email : '' , phone : '' , msg : ''});

  function handleChange(e){
    setData({ ...contactData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e){
    e.preventDefault();
    console.log(contactData);
        try {
          const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
          });

          if (response.ok) {
            alert("Message sent successfully!");
            setData({fname : '' , lname : '' , email : '' , phone : '' , msg : ''});
            navigate('/');
          } else {
            alert("Failed to send message.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while sending the message.");
        }
    };
  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 bg-green-200">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Get in touch</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="material-icons text-green-600">location</span>
              <p className="ml-4 text-green-800">Mysore,Karnataka</p>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-green-600">phone</span>
              <p className="ml-4 text-green-800">+91 6362660057</p>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-green-600">email</span>
              <p className="ml-4 text-green-800">ridegreen@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6">
          <form className="space-y-4" action="/post-contact" method="post" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fname"
                type="text"
                placeholder="First name"
                value={contactData.fname}
                onChange={handleChange}
                className="border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <input
                name="lname"
                type="text"
                placeholder="Last name"
                value={contactData.lname}
                onChange={handleChange}
                className="border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={contactData.email}
              onChange={handleChange}
              className="w-full border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone number"
              className="w-full border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={contactData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="msg"
              placeholder="Message"
              className="w-full border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              rows="5"
              value={contactData.msg}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
