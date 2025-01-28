import { useState } from "react";
import { VideoContext } from "./Context/VideoContext";
import HomePage from "./pages/HomePage";
import "./App.css";

const App = () => {
  const [detailsUpdated, setDetailsUpdated] = useState(false);

  return (
    <VideoContext.Provider value={{ detailsUpdated, setDetailsUpdated }}>
      <HomePage />
    </VideoContext.Provider>
  );
};

export default App;
