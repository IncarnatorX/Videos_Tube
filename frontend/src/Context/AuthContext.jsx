import { useEffect, useState } from "react";
import { AuthContext } from "./Context";
import api from "../utils/api";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(() => {
    let userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });
  const [accessToken, setAccessToken] = useState(null);

  // GET USER FROM SESSION STORAGE
  const getUserFromLocalStorage = () => {
    let userData = localStorage.getItem("user");
    if (userData) {
      let parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
      setUserLoggedIn(true);
    } else {
      setUser(null);
      setUserLoggedIn(false);
    }
  };

  // REFRESH TOKEN FUNCTION
  async function refreshTokens(originalRequest, is403 = false) {
    try {
      console.log("🔄 Access token expired, fetching new access token.....");
      const newRequestResponse = await api.post(
        "/refresh-token",
        {},
        { withCredentials: true }
      );

      if (newRequestResponse.status === 200) {
        console.log("✅ Refreshed Access token....", newRequestResponse.data);

        setAccessToken(newRequestResponse.data.accessToken); // SETTING THE NEW ACCESS TOKEN

        // 🔥 Ensuring the new token is set before retrying the request
        originalRequest.headers[
          "authorization"
        ] = `Bearer ${newRequestResponse.data.accessToken}`;

        console.log(
          "BEFORE HITTING /profile ROUTE. THE HEADER IS:",
          originalRequest.headers["authorization"]
        );

        console.log("ORIGINAL REQUEST: ", originalRequest);

        const user = await api.get("/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${newRequestResponse.data.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("USER AFTER REFRESHING TOKENS:", user);

        if (is403) {
          console.log("INSIDE THE IS403 BLOCK!!");
          localStorage.removeItem("user");
          setUser(null);
          setUserLoggedIn(false);
          toast.success("User logged out successfully.");
          localStorage.removeItem("_retry");
          return api(originalRequest);
        }
        console.log("OUTSIDE THE IS403 BLOCK!!");
        localStorage.setItem("user", JSON.stringify(user.data));
        console.log(
          "AFTER REFRESHING, IS USER IN LS: ",
          localStorage.getItem("user")
        );
        setUser(user.data);
        setUserLoggedIn(true);
        // console.log("Retrying request with new access token...");
        localStorage.removeItem("_retry");
        console.log(
          "ORIGINAL REQUEST AFTER REFRESHING TOKENS: ",
          originalRequest
        );
        return api(originalRequest); // Retry failed request with new token
      }
    } catch (error) {
      console.error("🚨 Refresh token failed. Logging out...", error.message);
      localStorage.removeItem("user");
      setUser(null);
      setUserLoggedIn(false);
    }
  }

  // ERROR HANDLER
  const errorHandler = async (error) => {
    console.log("❌ Interceptor caught an error:", error);

    if (!error.response) {
      // console.error("🚨 No response from server!");
      return Promise.reject(error);
    }

    console.log("🛑 Error Status:", error.response.status);

    const originalRequest = error.config;

    if (localStorage.getItem("_retry")) {
      // console.error("⛔ Already retried once. Logging out user...");
      setUserLoggedIn(false);
      localStorage.removeItem("_retry");
      return Promise.reject(error);
    }

    localStorage.setItem("_retry", "true"); // Store retry flag in Session storage

    // ACCESS TOKEN NOT PRESENT. BUT USER IS PERSISTED IN LS
    if (error.response.status === 403) {
      refreshTokens(originalRequest, true);
    }

    // ACCESS TOKEN EXPIRED AND USER IS PERSISTED IN LS
    if (error.response.status === 401) {
      refreshTokens(originalRequest);
    }

    if (error.response.status !== 401) return Promise.reject(error);

    localStorage.removeItem("_retry"); // Reset retry flag on failure
    return Promise.reject(error);
  };

  // USE EFFECT
  useEffect(() => {
    getUserFromLocalStorage();

    // REQUEST INTERCEPTOR
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken) config.headers.authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => errorHandler(error)
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn,
        setUserLoggedIn,
        user,
        setUser,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
