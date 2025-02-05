import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import VideoInfoPage from "./pages/VideoInfoPage";
import AuthPage from "./pages/AuthPage";
import AuthProvider from "./Context/AuthContext";
import VideoProvider from "./Context/VideoContext";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/videoInfo" element={<VideoInfoPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
