// src/components/NavBar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { userData, logout } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const avatar = userData?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="h-20 w-30" />
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/" className="hover:underline">Products</Link>
        <Link to="/" className="hover:underline">Contact</Link>
        <Link to="/" className="hover:underline">About</Link>
      </div>

      <div className="flex items-center gap-4">
        {userData ? (
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="h-10 w-10 rounded-full bg-white text-indigo-600 font-bold flex items-center justify-center cursor-pointer"
              title={userData.name}
            >
              {avatar}
            </button>
            {open && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-xl shadow-lg min-w-56 overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <div className="font-medium">{userData.name}</div>
                  <div className="text-xs text-gray-500">
                    {userData.isAccountVerified ? "Verified" : "Not verified"}
                  </div>
                </div>
                {!userData.isAccountVerified && (
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                      navigate("/email-verify");
                    }}
                  >
                    Verify email
                  </button>
                )}
                <button
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-indigo-600 px-5 py-2 rounded-full font-medium shadow cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
