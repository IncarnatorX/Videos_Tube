import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("🔄 Access token expired, fetching new access token.....");

      try {
        const newRequestResponse = await axios.post(
          "http://localhost:8080/refresh-token",
          {},
          { withCredentials: true }
        );

        if (newRequestResponse.status === 200) {
          console.log("Refreshed Access token....");
          return api(error.config);
        }
      } catch (error) {
        console.error(
          "Error refreshing access token, redirect to login page....",
          error.message
        );
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
