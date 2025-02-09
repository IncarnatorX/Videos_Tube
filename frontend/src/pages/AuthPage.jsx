import { useLocation } from "react-router";
import ToastComponent from "../components/ToastContainer";
import AuthRegister from "../components/Auth/AuthRegister";
import AuthLogin from "../components/Auth/AuthLogin";
import "../components/Auth/Auth.css";

const AuthPage = () => {
  const { state } = useLocation();

  const styles = {
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={styles}>
      {state === "register" && <AuthRegister />}
      {state === "login" && <AuthLogin />}
      <ToastComponent />
    </div>
  );
};

export default AuthPage;
