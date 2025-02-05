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
    getUserFromSessionStorage();

    if (user && error.response?.status === 401) {
      console.log("🔄 Access token expired, fetching new access token.....");

      try {
        const newRequestResponse = await api.post(
          "/refresh-token",
          {},
          { withCredentials: true }
        );

        if (newRequestResponse.status === 200) {
          console.log("Refreshed Access token....");
          const user = await api.get("/profile", { withCredentials: true });
          setUser(user.data);
          setUserLoggedIn(true);
          return api(error.config);
        }
      } catch (error) {
        console.error(
          "Error refreshing access token, redirect to login page....",
          error.message
        );
        setUserLoggedIn(false);
      }
    }
    return Promise.reject(error);
  };

  const checkAuthStatus = () => {
    getUserFromSessionStorage();
    api.interceptors.response.use(
      (response) => {
        if (user) {
          setUserLoggedIn(true);
        }
        return response;
      },
      (error) => errorHandler(error)
    );
  };

  useEffect(() => {
    checkAuthStatus();
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
