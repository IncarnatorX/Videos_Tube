import { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import UploadVideoIcon from "../components/UploadVideo/UploadVideoIcon.jsx";
import { AuthContext } from "../Context/Context.jsx";
import UploadVideoForm from "../components/UploadVideo/UploadVideoForm.jsx";
import VideoComponent from "../components/Video-component/VideoComponent.jsx";

const HomePage = () => {
  const { userLoggedIn } = useContext(AuthContext);

  return (
    <main>
      <Navbar />
      <VideoComponent />
      {userLoggedIn && (
        <>
          <UploadVideoIcon />
          <UploadVideoForm />
        </>
      )}
    </main>
  );
};

export default HomePage;
