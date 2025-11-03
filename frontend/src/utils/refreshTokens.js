import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import api from "./api";

async function refreshTokens(originalRequest) {
  const { setAccessToken, setUser, setUserLoggedIn } = useAuthStore.getState();

  try {
    console.log("🔄 Access token expired, fetching new access token.....");
    const newRequestResponse = await api.post(
      "/refresh-token",
      {},
      { withCredentials: true },
    );
    if (newRequestResponse.status === 200) {
      console.log("✅ Refreshed Access token....", newRequestResponse.data);

      setAccessToken(newRequestResponse.data.accessToken); // SETTING THE NEW ACCESS TOKEN

      // 🔥 Ensuring the new token is set before retrying the request
      originalRequest.headers["authorization"] =
        `Bearer ${newRequestResponse.data.accessToken}`;

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
    toast.error(error?.response?.data);
    console.error(error);
    localStorage.removeItem("user");
    setUser(null);
    setUserLoggedIn(false);
  }
}

export default refreshTokens;
