import { useAuthStore } from "../store/authStore";
import refreshTokens from "./refreshTokens";

const errorHandler = async (error) => {
  const { setUserLoggedIn } = useAuthStore.getState();

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

export default errorHandler;
