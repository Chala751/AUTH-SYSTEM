import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/" },
    { name: "Contact", path: "/" },
    { name: "About", path: "/" },
  ];

  const { userData, backendUrl,setUserData,setIsLoggedin } = useContext(AppContext);

  const navigate = useNavigate();
  const ref = React.useRef(null);

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(ref.current.scrollTop > 10);
    };
    ref.current.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="h-88 md:h-64 overflow-y-scroll">
      <p className="w-10 h-[500px]"></p>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-800 backdrop-blur-md py-3 md:py-4"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 md:py-6"
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src={"logo.png"}
            alt="logo"
            className={`h-20 w-30 transition-all duration-500 ${
              isScrolled ? "opacity-80" : "drop-shadow-md"
            }`}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 font-medium">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className={`group flex flex-col items-center gap-0.5 transition ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-indigo-600" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full`}
              />
            </a>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-5">
          <svg
            className={`h-6 w-6 transition-all duration-500 ${
              isScrolled ? "text-gray-600" : "text-white"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {userData ? 
          <div>{userData.name[0].toUpperCase()}
          <div><ul>
              <li>Verify email</li>
              <li>Logout</li>
            </ul></div>
          </div>
          :
          <button
            onClick={() => navigate("/login")}
            className={`px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition cupo cursor-pointer`}
          >
            Login
          </button>}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <svg
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`h-6 w-6 cursor-pointer ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg flex flex-col md:hidden items-center justify-center gap-8 font-medium transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="hover:underline"
            >
              {link.name}
            </a>
          ))}

          {userData ? 
          <div>{userData.name[0].toUpperCase()}
            <div><ul>
                <li>Verify email</li>
                <li>Logout</li>
              </ul></div>
          </div>
          :

          <button onClick={() => navigate("/login")} className="bg-white text-indigo-600 px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition">
            Login
          </button>}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
