import { Route, Routes } from "react-router";
import HomePage from "../../pages/HomePage";
import VideoInfoPage from "../../pages/VideoInfoPage";
import MyAccountPage from "../../pages/MyAccountPage";
import ConfirmPasswordComponent from "../Confirm-Password/ConfirmPasswordComponent";
import ChangePasswordComponent from "../Change-Password/ChangePasswordComponent";
import VerifyEmail from "../VerifyEmail/VerifyEmail";
import VerifyOTP from "../VerifyOTP/VerifyOTP";
import ResetPasswordComponent from "../Reset-Password/ResetPasswordComponent";
import ErrorNotFound from "../Error/ErrorNotFound";
import AuthLogin from "../Auth/AuthLogin";
import AuthRegister from "../Auth/AuthRegister";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/videoInfo" element={<VideoInfoPage />} />
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/register" element={<AuthRegister />} />
      <Route path="/account" element={<MyAccountPage />} />
      <Route path="/cnf-pwd" element={<ConfirmPasswordComponent />} />
      <Route path="/change-pwd" element={<ChangePasswordComponent />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-pwd" element={<ResetPasswordComponent />} />
      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
