import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import MyAccountDetails from "../components/MyAccount/MyAccountDetails";
import Navbar from "../components/Navbar/Navbar";
import MyAccountPublishVideos from "../components/MyAccount/MyAccountPublishVideos";
import api from "../utils/api";
import EditVideoDetails from "../components/Edit-Video/EditVideoDetails";
import ReUploadVideoComponent from "../components/Reupload-video/ReUploadVideoComponent";

const MyAccountPage = () => {
  const { state: user } = useLocation();
  const [userVideos, setUserVideos] = useState([]);

  async function fetchUserVideos() {
    try {
      const response = await api.post("/getUserVideos", user._id, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const { payload } = response.data;
        setUserVideos(payload);
      }
    } catch (error) {
      console.error("Unable to fetch requests: ", error.message);
    }
  }

  useEffect(() => {
    fetchUserVideos();
  }, []);

  return (
    <div>
      <Navbar />
      <MyAccountDetails user={user} />
      <MyAccountPublishVideos userVideos={userVideos} />
      <EditVideoDetails />
      <ReUploadVideoComponent />
    </div>
  );
};

export default MyAccountPage;
