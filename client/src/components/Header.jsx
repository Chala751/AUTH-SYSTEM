// src/components/Header.jsx
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData, getUserData } = useContext(AppContext);

  useEffect(() => {
    getUserData(); // safe: auth middleware will accept only if logged in
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-[520px] flex flex-col items-center justify-center px-4 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="flex items-center gap-2.5 mb-6 border border-white/30 rounded-full bg-white/10 pl-4 p-1 text-sm backdrop-blur-sm">
        <p>Hey {userData?.name || "there"} 🚀 Launching our new platform update.</p>
        <button className="bg-white text-indigo-600 font-medium border border-gray-200 rounded-2xl px-3 py-1 shadow-sm">
          Explore
        </button>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight drop-shadow-md">
        Solutions to Elevate Your Business Growth
      </h1>

      <p className="max-w-xl mt-6 text-gray-100 text-lg">
        Unlock potential with tailored strategies designed for success.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
        <button className="px-7 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow hover:shadow-lg cursor-pointer">
          Get Started Now
        </button>
        <button className="px-7 py-3 rounded-full border border-white/40">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Header;
