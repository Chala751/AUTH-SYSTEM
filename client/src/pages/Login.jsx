import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react"; // Added User icon

const Login = () => {
  const [state, setState] = useState("Sign Up");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form className="max-w-md w-full text-center border border-gray-200 rounded-2xl p-8 bg-white shadow-xl">
        <h1 className="text-gray-900 text-3xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        {/* Full Name Input - only for Sign Up */}
        {state === "Sign Up" && (
          <div className="flex items-center w-full mt-8 bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:ring-2 focus-within:ring-indigo-400 transition">
            <User className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>
        )}

        {/* Email Input */}
        <div className="flex items-center w-full mt-4 bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:ring-2 focus-within:ring-indigo-400 transition">
          <Mail className="w-5 h-5 text-gray-500" />
          <input
            type="email"
            placeholder="Email address"
            className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:ring-2 focus-within:ring-indigo-400 transition">
          <Lock className="w-5 h-5 text-gray-500" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Forgot password */}
        {state !== "Sign Up" && (
          <div className="mt-3 text-right">
            <a className="text-sm text-indigo-500 hover:underline" href="#">
              Forgot password?
            </a>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-full text-white font-medium bg-indigo-500 hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          {state}
        </button>

        {/* Toggle links */}
        {state === "Sign Up" ? (
          <p className="text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setState("Login")}
              className="text-indigo-500 font-medium hover:underline cursor-pointer"
            >
              Login here
            </button>
          </p>
        ) : (
          <p className="text-gray-500 text-sm mt-6">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => setState("Sign Up")}
              className="text-indigo-500 font-medium hover:underline cursor-pointer"
            >
              Sign up here
            </button>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
