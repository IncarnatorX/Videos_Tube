import { BrowserRouter, Route, Routes } from "react-router";
import ToastComponent from "./components/ToastContainer";
import HomePage from "./pages/HomePage";
import VideoInfoPage from "./pages/VideoInfoPage";
import AuthPage from "./pages/AuthPage";
import AuthProvider from "./Context/AuthContext";
import VideoProvider from "./Context/VideoContext";
import MyAccountPage from "./pages/MyAccountPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorNotFound from "./components/Error/ErrorNotFound";
import ConfirmPasswordComponent from "./components/Confirm-Password/ConfirmPasswordComponent";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary fallback={<ErrorNotFound />}>
          <VideoProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/videoInfo" element={<VideoInfoPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/account" element={<MyAccountPage />} />
                <Route path="/cnf-pwd" element={<ConfirmPasswordComponent />} />
                <Route path="*" element={<ErrorNotFound />} />
              </Routes>
            </AuthProvider>
          </VideoProvider>
        </ErrorBoundary>
      </BrowserRouter>
      <ToastComponent />
    </>
  );
};

export default App;
