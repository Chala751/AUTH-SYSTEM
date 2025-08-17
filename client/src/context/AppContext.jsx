// src/context/AppContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // axios instance that ALWAYS sends cookies
  const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [userData, setUserData] = useState(null);

  // ---------- API helpers ----------
  const getAuthState = async () => {
    try {
      const { data } = await api.get("/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData(); // load profile
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setLoadingAuth(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await api.get("/api/user/data");
      if (data.success) setUserData(data.userData);
      else toast.error(data.message || "Failed to load user");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/api/auth/register", { name, email, password });
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
        toast.success("Registered successfully");
        return true;
      }
      toast.error(data.message);
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
        toast.success("Logged in");
        return true;
      }
      toast.error(data.message);
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success("Logged out");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const sendVerifyOtp = async () => {
    try {
      const { data } = await api.post("/api/auth/send-verify-otp");
      data.success ? toast.success("OTP sent to your email") : toast.error(data.message);
      return data.success;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  const verifyEmail = async (otp) => {
    try {
      const { data } = await api.post("/api/auth/verify-account", { otp });
      if (data.success) {
        toast.success("Email verified");
        await getUserData();
        return true;
      }
      toast.error(data.message);
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  const sendResetOtp = async (email) => {
    try {
      const { data } = await api.post("/api/auth/send-reset-otp", { email });
      data.success ? toast.success("Reset OTP sent") : toast.error(data.message);
      return data.success;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const { data } = await api.post("/api/auth/reset-password", { email, otp, newPassword });
      if (data.success) {
        toast.success("Password reset successful");
        return true;
      }
      toast.error(data.message);
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return false;
    }
  };

  useEffect(() => {
    getAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    backendUrl,
    api,
    isLoggedIn,
    loadingAuth,
    userData,
    setUserData,
    setIsLoggedIn,
    // actions
    register,
    login,
    logout,
    getUserData,
    sendVerifyOtp,
    verifyEmail,
    sendResetOtp,
    resetPassword,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
