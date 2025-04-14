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
  async function refreshTokens(originalRequest) {
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

        const refreshedUser = await api.get("/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${newRequestResponse.data.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const { user } = refreshedUser.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setUserLoggedIn(true);
        localStorage.removeItem("_retry");
        console.log("Retrying request with new access token...");
        const retryResponse = await api(originalRequest);
        return retryResponse; // Ensure we return this!
      }
    } catch (error) {
      console.error("🚨 Refresh token failed. Logging out...");
      toast.error(error.response.data);
      console.error(error);
      localStorage.removeItem("user");
      setUser(null);
      setUserLoggedIn(false);
    }
  }

  // ERROR HANDLER
  const errorHandler = async (error) => {
    console.log("❌ Interceptor caught an error:", error);

    if (!error.response) {
      return Promise.reject(error);
    }

    console.log("🛑 Error Status:", error.response.status);

    const originalRequest = error.config;

    if (localStorage.getItem("_retry")) {
      setUserLoggedIn(false);
      localStorage.removeItem("_retry");
      return Promise.reject(error);
    }

    // ACCESS TOKEN NOT PRESENT. BUT USER IS PERSISTED IN LS
    if (error.response.status === 403) {
      localStorage.setItem("_retry", "true"); // Store retry flag in Session storage
      return await refreshTokens(originalRequest, true);
    }

    // ACCESS TOKEN EXPIRED AND USER IS PERSISTED IN LS
    if (error.response.status === 401) {
      localStorage.setItem("_retry", "true"); // Store retry flag in Session storage
      return await refreshTokens(originalRequest);
    }

    console.log("JUST BEFORE NOT 401 ERROR CHECK!!");
    if (error.response.status !== 401) return Promise.reject(error);
    console.log("AFTER ALL IF CONDITIONS FAIL");
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
      (error) => errorHandler(error)
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
