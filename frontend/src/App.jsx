import { useState, useEffect } from "react";
import { VideoContext } from "./Context/VideoContext";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import VideoInfoPage from "./pages/VideoInfoPage";
import "./App.css";
import AuthPage from "./pages/AuthPage";

const App = () => {
  const [detailsUpdated, setDetailsUpdated] = useState(false);
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:8080/getAllVideos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [detailsUpdated]);

  return (
    <BrowserRouter>
      <VideoContext.Provider
        value={{ detailsUpdated, setDetailsUpdated, videos }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/videoInfo" element={<VideoInfoPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </VideoContext.Provider>
    </BrowserRouter>
  );
};

export default App;
