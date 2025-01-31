import { useNavigate } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="homepage-navbar">
      <img src="./icon.webp" alt="Icon" className="navbar-logo" />
      <h1 className="navbar-title">VideoTube</h1>
      <div className="auth-buttons">
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
      </div>
    </nav>
  );
};

export default Navbar;
