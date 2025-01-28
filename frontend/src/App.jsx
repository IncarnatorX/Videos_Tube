import { useState, useEffect } from "react";
import { VideoContext } from "./Context/VideoContext";
import HomePage from "./pages/HomePage";
import axios from "axios";
import "./App.css";

const App = () => {
  const [detailsUpdated, setDetailsUpdated] = useState(false);
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllVideos");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [detailsUpdated]);

  return (
    <VideoContext.Provider
      value={{ detailsUpdated, setDetailsUpdated, videos }}
    >
      <HomePage />
    </VideoContext.Provider>
  );
};

export default App;
