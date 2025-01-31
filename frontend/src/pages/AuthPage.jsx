import { useLocation } from "react-router";
import Auth from "../components/Auth/Auth";
import ToastComponent from "../components/ToastContainer";

const AuthPage = () => {
  const location = useLocation();

  const styles = {
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={styles}>
      <Auth state={location.state} />
      <ToastComponent />
    </div>
  );
};

export default AuthPage;
