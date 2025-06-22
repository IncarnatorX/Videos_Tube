import { Route, Routes } from "react-router";
import HomePage from "../../pages/HomePage";
import VideoInfoPage from "../../pages/VideoInfoPage";
import MyAccountPage from "../../pages/MyAccountPage";
import ConfirmPasswordComponent from "../Confirm-Password/ConfirmPasswordComponent";
import ChangePasswordComponent from "../Change-Password/ChangePasswordComponent";
import VerifyEmail from "../VerifyEmail/VerifyEmail";
import VerifyOTP from "../VerifyOTP/VerifyOTP";
import ResetPasswordComponent from "../Reset-Password/ResetPasswordComponent";
import PageNotFound from "../Page-Not-Found/PageNotFound";
import AuthLogin from "../Auth/AuthLogin";
import AuthRegister from "../Auth/AuthRegister";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/register" element={<AuthRegister />} />
      <Route path="/videoInfo" element={<VideoInfoPage />} />
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <MyAccountPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/cnf-pwd"
        element={
          <PrivateRoute>
            <ConfirmPasswordComponent />
          </PrivateRoute>
        }
      />
      <Route
        path="/change-pwd"
        element={
          <PrivateRoute>
            <ChangePasswordComponent />
          </PrivateRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <PrivateRoute>
            <VerifyEmail />
          </PrivateRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <PrivateRoute>
            <VerifyOTP />
          </PrivateRoute>
        }
      />
      <Route
        path="/reset-pwd"
        element={
          <PrivateRoute>
            <ResetPasswordComponent />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
