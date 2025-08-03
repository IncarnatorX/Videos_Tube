import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

const tokenAndErrorHandlerObject = {
  accessToken: null,
  errorHandler: null,
};

export function handleTokenAndErrorHandlerObject(token, errorHandler) {
  tokenAndErrorHandlerObject.accessToken = token;
  tokenAndErrorHandlerObject.errorHandler = errorHandler;
}

api.interceptors.request.use(
  (config) => {
    console.log("REQUEST INTERCEPTOR", config);
    if (tokenAndErrorHandlerObject.accessToken)
      config.headers.authorization = `Bearer ${tokenAndErrorHandlerObject.accessToken}`;
    return config;
  },
  // (error) => Promise.reject(error)
  (error) => tokenAndErrorHandlerObject.errorHandler(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    console.log("RESPONSE INTERCEPTOR", response);
    return response;
  },
  (error) => tokenAndErrorHandlerObject.errorHandler(error)
);

export default api;
