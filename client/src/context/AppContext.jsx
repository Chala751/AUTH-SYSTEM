import { createContext } from "react";

export const AppContext = createContext()

export const AppProvider = (props) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const value = { backendUrl, isLoggedIn, setIsLoggedIn, userData, setUserData };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}