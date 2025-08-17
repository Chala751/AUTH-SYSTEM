// src/pages/ResetPassword.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ResetPassword = () => {
  const { sendResetOtp, resetPassword } = useContext(AppContext);
  const navigate = useNavigate(); // <- add this
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();
    const ok = await sendResetOtp(email);
    if (ok) setStep(2);
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();
    const ok = await resetPassword(email, otp, newPassword);
    if (ok) {
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      navigate("/login"); // <- navigate to login page after success
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Reset Password</h1>

        {step === 1 ? (
          <form onSubmit={requestOtp} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-200 cursor-pointer"
            >
              Send Reset OTP
            </button>
          </form>
        ) : (
          <form onSubmit={submitNewPassword} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
              <input
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="********"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              Reset Password
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-100 transition duration-200 cursor-pointer"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
