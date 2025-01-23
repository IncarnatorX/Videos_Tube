import { useState } from "react";
import VideoList from "./components/VideoList";
import { VideoContext } from "./Context/VideoContext";

const App = () => {
  const [detailsUpdated, setDetailsUpdated] = useState(false);

  return (
    <VideoContext.Provider value={{ detailsUpdated, setDetailsUpdated }}>
      <VideoList />
    </VideoContext.Provider>
  );
};

export default App;
