import { BrowserRouter } from "react-router";
import ToastComponent from "./components/ToastContainer";
import AuthProvider from "./Context/AuthContext";
import VideoProvider from "./Context/VideoContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorNotFound from "./components/Error/ErrorNotFound";
import AllRoutes from "./components/Routes/AllRoutes";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary fallback={<ErrorNotFound />}>
          <VideoProvider>
            <AuthProvider>
              <AllRoutes />
            </AuthProvider>
          </VideoProvider>
        </ErrorBoundary>
      </BrowserRouter>
      <ToastComponent />
    </>
  );
};

export default App;
