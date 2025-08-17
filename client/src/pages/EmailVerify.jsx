// src/pages/EmailVerify.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const EmailVerify = () => {
  const { userData, sendVerifyOtp, verifyEmail } = useContext(AppContext);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate(); // <-- hook for navigation

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="max-w-md w-full text-center border border-gray-200 rounded-2xl p-8 bg-white shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800">Email Verification</h1>
          <p className="mt-4 text-gray-600">You must be logged in to verify your email.</p>
        </div>
      </div>
    );
  }

  const handleVerifyEmail = async () => {
    const ok = await verifyEmail(otp);
    if (ok) {
      setOtp("");
      navigate("/"); // <-- redirect to home page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="max-w-md w-full border border-gray-200 rounded-2xl p-8 bg-white shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Email Verification</h1>
        
        <p className="text-center text-gray-600 mt-2">
          Status:{" "}
          <span
            className={`font-medium ${
              userData.isAccountVerified ? "text-green-600" : "text-amber-600"
            }`}
          >
            {userData.isAccountVerified ? "Verified ✅" : "Not Verified ❌"}
          </span>
        </p>

        {!userData.isAccountVerified && (
          <>
            {/* Send OTP Button */}
            <button
              onClick={sendVerifyOtp}
              className="mt-6 w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-200 cursor-pointer"
            >
              Send Verification OTP
            </button>

            {/* OTP Input */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleVerifyEmail} // <-- use handler
                className="mt-4 w-full px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition duration-200 cursor-pointer"
              >
                Verify Email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
