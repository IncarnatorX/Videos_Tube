import { useContext, useEffect, useRef, useState } from "react";
import MyAccountDetails from "../components/MyAccount/MyAccountDetails";
import Navbar from "../components/Navbar/Navbar";
import MyAccountPublishVideos from "../components/MyAccount/MyAccountPublishVideos";
import api from "../utils/api";
import EditVideoDetails from "../components/Edit-Video/EditVideoDetails";
import ReUploadVideoComponent from "../components/Reupload-video/ReUploadVideoComponent";
import EditAvatarModel from "../components/EditAvatarModel/EditAvatarModel.jsx";
import { AuthContext } from "../Context/Context.jsx";

const MyAccountPage = () => {
  const { user } = useContext(AuthContext);
  const [userVideos, setUserVideos] = useState([]);

  const editAvatarRef = useRef(null);

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
      <MyAccountDetails editAvatarRef={editAvatarRef} />
      <MyAccountPublishVideos userVideos={userVideos} />
      <EditVideoDetails />
      <ReUploadVideoComponent />
      <EditAvatarModel id={user._id} editAvatarRef={editAvatarRef} />
    </div>
  );
};

export default MyAccountPage;
