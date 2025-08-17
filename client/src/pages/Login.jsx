// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [mode, setMode] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, login } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (mode === "Sign Up") {
      const ok = await register(name, email, password);
      if (ok) navigate("/");
    } else {
      const ok = await login(email, password);
      if (ok) navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form onSubmit={onSubmit} className="max-w-md w-full text-center border border-gray-200 rounded-2xl p-8 bg-white shadow-xl">
        <h1 className="text-gray-900 text-3xl font-semibold">
          {mode === "Sign Up" ? "Create Account" : "Login"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          {mode === "Sign Up" ? "Create your account" : "Login to your account"}
        </p>

        {mode === "Sign Up" && (
          <div className="flex items-center w-full mt-8 bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-transparent text-gray-700 outline-none text-sm w-full h-full"
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-transparent text-gray-700 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock className="w-5 h-5 text-gray-500" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-transparent text-gray-700 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {mode !== "Sign Up" && (
          <div className="mt-3 text-right">
            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-sm text-indigo-500 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-full text-white font-medium bg-indigo-500 hover:bg-indigo-600 shadow cursor-pointer"
        >
          {mode}
        </button>

        {mode === "Sign Up" ? (
          <p className="text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("Login")}
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
              onClick={() => setMode("Sign Up")}
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
