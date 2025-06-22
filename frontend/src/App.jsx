import { BrowserRouter } from "react-router";
import ToastComponent from "./components/ToastContainer";
import AuthProvider from "./Context/AuthContext";
// import VideoProvider from "./Context/VideoContext";
import { ErrorBoundary } from "react-error-boundary";
import PageNotFound from "./components/Page-Not-Found/PageNotFound";
import AllRoutes from "./components/Routes/AllRoutes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary fallback={<PageNotFound />}>
          {/* <VideoProvider> */}
          <AuthProvider>
            <AllRoutes />
          </AuthProvider>
          {/* </VideoProvider> */}
        </ErrorBoundary>
      </BrowserRouter>
      <ToastComponent />
    </>
  );
};

export default App;
