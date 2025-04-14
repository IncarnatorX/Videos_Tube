import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/Context";
import LogoutComponent from "../Auth/LogoutComponent";
import LoginComponent from "../Auth/LoginComponent";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useContext(AuthContext);
  return (
    <nav className="homepage-navbar">
      <img
        src="./icon.webp"
        alt="Icon"
        className="navbar-logo cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1 className="navbar-title">VideoTube</h1>
      <div className="auth-buttons">
        {userLoggedIn ? <LogoutComponent /> : <LoginComponent />}
      </div>
    </nav>
  );
};

export default Navbar;
