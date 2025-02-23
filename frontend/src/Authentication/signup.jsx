import React,{useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';

import { auth, db , googleProvider} from "./firebase.js"; 
import { createUserWithEmailAndPassword, updateProfile , signInWithPopup } from "firebase/auth";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      try {
        const response = await fetch(`${BACKEND_URL}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: user.displayName, email: user.email }),
        });
  
        if (!response.ok) {
          alert("Failed to save user data.");
        } else {
          console.log("User data saved successfully via API.");
        }
      } catch (error) {
        console.error("Error during API call:", error);
        alert("An error occurred while saving user data.");
      }
  
      alert("Google signup successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };
  

  const handleSignUP = async (e) => {
    e.preventDefault(); 
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName: name });

      try{
        const response = await fetch(`${BACKEND_URL}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name: name , email: email , age: age , phone: phone , gender: gender}),
        });

        if (!response.ok) {
          alert("Failed to send message.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending the message.");
      }

      alert("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      navigate('/');
    } catch (error) {
      setError(error.message); 
      alert(error);
    }
  };

  return (
      <div className="flex w-full items-center bg-green-900">
        <div className="my-10 mb-10 mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem] bg-white p-8 rounded-lg shadow-lg">
        <Link to={'/'} className='self-center m-5'>
          <img src="/main-logo.png" alt="logo"  className='rounded-full h-12'/>
        </Link>
          <p className="text-center text-green-800 text-3xl font-semibold md:text-left md:leading-tight">Create your free account</p>
          <form className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSignUP}>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="text"
                  id="phoneNo"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="PhoneNo "
                  pattern='[6789][0-9]{9}'
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full p-2"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Age"
                  min={18}
                  max={60}
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password (minimum 8 characters)"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="block">
              <input
                className="mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-green-800 focus:border-green-600 focus:shadow"
                type="checkbox"
                id="terms"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\")",
                }}
                defaultChecked
              />
              <label className="inline-block" htmlFor="terms">
                I agree to the <a className="underline" href="#">Terms and Conditions</a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-900 transition duration-200 mt-7"
            >
              Sign up
            </button>
          </form>
          
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">
              Or use Google instead
            </div>
          </div>

        <button
          onClick={handleGoogleSignup}
          className="mt-7 w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center hover:bg-green-900 hover:text-white transition duration-200"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12h8.187c-.35 2.128-2.011 5.012-5.187 5.012-3.083 0-5.621-2.555-5.621-5.621s2.555-5.621 5.621-5.621c1.548 0 2.851.571 3.83 1.499l2.872-2.872c-1.704-1.61-3.971-2.605-6.702-2.605-5.524 0-10 4.476-10 10s4.476 10 10 10c5.597 0 9.646-4.26 9.646-9.646 0-.65-.055-1.28-.146-1.895h-9.5v3.59z"></path>
          </svg>
          Get started with Google
        </button>


          <p className="mt-7 text-center text-sm/6 text-gray-500">
            Already have an account?
            {/* <a href="#" className="whitespace-nowrap font-semibold text-green-700"> Login here</a> */}
            <Link
                to="/login"
                className="whitespace-nowrap font-semibold text-green-700 px-3"
            >
                Login here
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Signup;