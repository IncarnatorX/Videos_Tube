import { useLocation } from "react-router";
import Auth from "../components/Auth/Auth";

const AuthPage = () => {
  const location = useLocation();
  console.log(location.state);

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
    </div>
  );
};

export default AuthPage;
