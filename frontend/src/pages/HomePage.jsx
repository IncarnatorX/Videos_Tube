import Navbar from "../components/Navbar/Navbar";
import UploadVideoIcon from "../components/UploadVideo/UploadVideoIcon.jsx";
// import { AuthContext } from "../Context/Context.jsx";
import UploadVideoForm from "../components/UploadVideo/UploadVideoForm.jsx";
import VideoComponent from "../components/Video-component/VideoComponent.jsx";
import { useAuthStore } from "../store/authStore.js";

const HomePage = () => {
  // const { userLoggedIn } = useContext(AuthContext);

  const { userLoggedIn } = useAuthStore((store) => store);

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
