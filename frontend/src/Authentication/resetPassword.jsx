import React, { useState } from "react";
import { auth } from "./firebase";
import { sendPasswordResetEmail  } from "firebase/auth";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError(""); // Clear any previous errors
    } catch (err) {
      setMessage(""); // Clear any previous messages
      setError(err.message); // Display the error message
    }
  };

  return (
    <div className="flex w-full justify-center p-6 bg-green-900 h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-min self-center">
        <h2 className="text-2xl font-semibold mb-6 text-green-900 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-900 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        {message && <p className="mt-4 text-green-700">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
