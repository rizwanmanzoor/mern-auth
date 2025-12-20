import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  const [isLoggedin, setIsLoggedin] = useState(null);
  const [userData, setUserData] = useState(null);

  const getAuthState = async ({ suppressToast = false } = {}) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedin(true);
        getUserData({ suppressToast });
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedin(false);
      setUserData(null);

      if (!suppressToast && error.response?.status !== 401) {
        toast.error("Authentication check failed");
      }
    }
  };

  const getUserData = async ({ suppressToast = false } = {}) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");

      if (data.success) {
        setUserData(data.userData);
      } else {
        if (!suppressToast) toast.error(data.message);
      }
    } catch (error) {
      if (!suppressToast && error.response?.status !== 401) {
        toast.error(
          error.response?.data?.message || "Failed to fetch user data"
        );
      }
      setUserData(null);
    }
  };

  useEffect(() => {
    getAuthState({ suppressToast: true });
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
