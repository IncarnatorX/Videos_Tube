import axios from "axios";
import { useAuthStore } from "../store/authStore";
import errorHandler from "./axiosErrorHandler";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// const tokenAndErrorHandlerObject = {
//   accessToken: null,
//   errorHandler: null,
// };

// export function handleTokenAndErrorHandlerObject(token, errorHandler) {
//   tokenAndErrorHandlerObject.accessToken = token;
//   tokenAndErrorHandlerObject.errorHandler = errorHandler;
// }

api.interceptors.request.use(
  (config) => {
    const state = useAuthStore.getState();
    const accessToken = state.accessToken;
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    console.log("REQUEST INTERCEPTOR", config);
    return config;
  },
  // (error) => Promise.reject(error)
  (error) => errorHandler(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    // console.log("RESPONSE INTERCEPTOR", response);
    return response;
  },
  (error) => errorHandler(error)
);

export default api;
