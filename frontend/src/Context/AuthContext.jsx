import { useEffect, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "./Context";
import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const getUserFromSessionStorage = () => {
    let userData = sessionStorage.getItem("user");
    if (userData) {
      let parsedUserData = JSON.parse(userData);
      setUserLoggedIn(true);
      setUser(parsedUserData);
    } else {
      setUserLoggedIn(false);
    }
  };

  const errorHandler = async (error) => {
    // console.log("❌ Interceptor caught an error:", error);

    if (!error.response) {
      // console.error("🚨 No response from server!");
      return Promise.reject(error);
    }

    // console.log("🛑 Error Status:", error.response.status);

    const originalRequest = error.config;

    if (sessionStorage.getItem("_retry")) {
      // console.error("⛔ Already retried once. Logging out user...");
      setUserLoggedIn(false);
      sessionStorage.removeItem("_retry");
      return Promise.reject(error);
    }

    sessionStorage.setItem("_retry", "true"); // Store retry flag in Session storage

    try {
      // console.log("🔄 Access token expired, fetching new access token.....");
      const newRequestResponse = await api.post(
        "/refresh-token",
        {},
        { withCredentials: true }
      );

      if (newRequestResponse.status === 200) {
        // console.log("✅ Refreshed Access token....", newRequestResponse.data);

        const user = await api.get("/profile", { withCredentials: true });
        sessionStorage.setItem("user", JSON.stringify(user.data));

        setUser(user.data);
        setUserLoggedIn(true);

        // console.log("Retrying request with new access token...");
        sessionStorage.removeItem("_retry");

        return api(originalRequest); // Retry failed request with new token
      }
    } catch (error) {
      console.error("🚨 Refresh token failed. Logging out...", error.message);
      setUserLoggedIn(false);
    }

    sessionStorage.removeItem("_retry"); // Reset retry flag on failure
    return Promise.reject(error);
  };

  useEffect(() => {
    getUserFromSessionStorage();

    const interceptor = api.interceptors.response.use(
      (response) => {
        if (user) setUserLoggedIn(true);
        return response;
      },
      async (error) => errorHandler(error)
    );

    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider
      value={{ userLoggedIn, setUserLoggedIn, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
