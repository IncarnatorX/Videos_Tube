import { useNavigate } from "react-router";
import "./Navbar.css";
import { useContext } from "react";
import { VideoContext } from "../../Context/VideoContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useContext(VideoContext);

  return (
    <nav className="homepage-navbar">
      <img src="./icon.webp" alt="Icon" className="navbar-logo" />
      <h1 className="navbar-title">VideoTube</h1>
      <div className="auth-buttons">
        {userLoggedIn ? (
          <button className="auth-btn">Logout</button>
        ) : (
          <>
            <button
              className="auth-btn login-btn"
              onClick={() => navigate("/auth", { state: "login" })}
            >
              Login
            </button>
            <button
              className="auth-btn register-btn"
              onClick={() => navigate("/auth", { state: "register" })}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
