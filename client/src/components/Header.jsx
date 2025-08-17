import React from "react";

const Header = () => {
  return (
    <div className="h-[580px] flex flex-col items-center justify-center px-4 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Announcement badge */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-white/30 rounded-full bg-white/10 pl-4 p-1 text-sm max-w-full backdrop-blur-sm">
        <p>🚀 Launching our new platform update.</p>
        <div className="flex items-center cursor-pointer gap-2 bg-white text-indigo-600 font-medium border border-gray-200 rounded-2xl px-3 py-1 shadow-sm hover:shadow-md transition">
          <p>Explore</p>
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
              stroke="#4F46E5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Main title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl leading-tight drop-shadow-md">
        Solutions to Elevate Your Business Growth
      </h1>

      {/* Subtitle */}
      <p className="max-w-xl text-center mt-6 px-4 text-gray-100 text-lg">
        Unlock potential with tailored strategies designed for success.
        Simplify challenges, maximize results, and stay ahead in the competitive market.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
        <button className="px-7 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-md hover:shadow-lg hover:bg-gray-100 transition">
          Get Started Now
        </button>
        <button className="group px-7 py-3 flex items-center gap-2 font-medium text-white border border-white/40 rounded-full hover:bg-white/10 transition">
          Learn more
          <svg
            className="group-hover:translate-x-1 transition pt-0.5"
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
