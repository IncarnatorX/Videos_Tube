import { useContext, useEffect, useRef, useState } from "react";
import MyAccountDetails from "../components/MyAccount/MyAccountDetails";
import Navbar from "../components/Navbar/Navbar";
import MyAccountPublishVideos from "../components/MyAccount/MyAccountPublishVideos";
import api from "../utils/api";
import EditVideoDetails from "../components/Edit-Video/EditVideoDetails";
import ReUploadVideoComponent from "../components/Reupload-video/ReUploadVideoComponent";
import EditAvatarModel from "../components/EditAvatarModel/EditAvatarModel.jsx";
import { AuthContext } from "../Context/Context.jsx";
import { useVideoStore } from "../store/videoStore.js";

const MyAccountPage = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { setCurrentVideoID } = useVideoStore((store) => store);
  const [userVideos, setUserVideos] = useState([]);

  const editAvatarRef = useRef(null);
  const editDialogRef = useRef(null);
  const reuploadRef = useRef(null);

  console.log("ACCESS TOKEN", accessToken);

  useEffect(() => {
    (async function () {
      try {
        const response = await api.post(
          "/get-user-videos",
          { id: user._id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const { payload } = response.data;
          setUserVideos(payload);
        }
      } catch (error) {
        console.error(error);
        console.error("Unable to fetch requests: ", error.message);
      }
    })();
  }, [user._id]);

  // EDIT BUTTON DIALOG HANDLINGS
  function handleEditDialogOpening(id) {
    if (editDialogRef.current) {
      editDialogRef.current.showModal();
      setCurrentVideoID(id);
    }
  }

  // RE-UPLOAD DIALOG HANDLING
  function handleReuploadDialogOpen(id) {
    const { current } = reuploadRef;
    current.showModal();
    setCurrentVideoID(id);
  }

  return (
    <div>
      <Navbar />
      <MyAccountDetails editAvatarRef={editAvatarRef} />
      <MyAccountPublishVideos
        userVideos={userVideos}
        handleEditDialogOpening={handleEditDialogOpening}
        handleReuploadDialogOpen={handleReuploadDialogOpen}
      />
      <EditVideoDetails editDialogRef={editDialogRef} />
      <ReUploadVideoComponent reuploadRef={reuploadRef} />
      <EditAvatarModel id={user?._id} editAvatarRef={editAvatarRef} />
    </div>
  );
};

export default MyAccountPage;
