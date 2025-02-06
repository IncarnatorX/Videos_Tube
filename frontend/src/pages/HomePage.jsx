import { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import UploadVideoIcon from "../components/UploadVideo/UploadVideoIcon.jsx";
import VideoList from "../components/VideoList";
import { AuthContext } from "../Context/Context.jsx";
import UploadVideoForm from "../components/UploadVideo/UploadVideoForm.jsx";

const HomePage = () => {
  const { userLoggedIn } = useContext(AuthContext);

  return (
    <main>
      <Navbar />
      <VideoList />
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
