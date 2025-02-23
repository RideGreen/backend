import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import logo from "/main-logo.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully");
      navigate("/"); // Redirect after successful login
    } 
    catch (err) {
      setError(err.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful");
      navigate("/"); // Redirect after successful Google login
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="flex w-full justify-center p-6 bg-green-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex-col justify-center items-center">
        <Link to={"/"} className="flex flex-col items-center m-5">
          <img src="/main-logo.png" alt="logo" className="rounded-full h-12 justify-center" />
        </Link>
        <h2 className="text-2xl font-semibold mb-6 text-green-900 text-center">Log In</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="my-6">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-semibold text-green-700 hover:text-green-600">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-900 transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <span className="border-t w-full border-gray-300"></span>
          <span className="mx-4 text-gray-500">or</span>
          <span className="border-t w-full border-gray-300"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center hover:bg-green-900 hover:text-white transition duration-200"
        >
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12h8.187c-.35 2.128-2.011 5.012-5.187 5.012-3.083 0-5.621-2.555-5.621-5.621s2.555-5.621 5.621-5.621c1.548 0 2.851.571 3.83 1.499l2.872-2.872c-1.704-1.61-3.971-2.605-6.702-2.605-5.524 0-10 4.476-10 10s4.476 10 10 10c5.597 0 9.646-4.26 9.646-9.646 0-.65-.055-1.28-.146-1.895h-9.5v3.59z"></path>
          </svg>
          Log in with Google
        </button>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to={"/signup"} className="font-semibold text-green-700 hover:text-green-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

