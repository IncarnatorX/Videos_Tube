import { useNavigate } from "react-router";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn, user, setUser, setUserLoggedIn } =
    useContext(AuthContext);
  // let userLoggedIn = false;

  async function handleUserLogout() {
    try {
      const response = await axios.post(
        "http://localhost:8080/logout",
        user._id,
        { withCredentials: true }
      );

      if (response.status === 200) {
        sessionStorage.removeItem("user");
        setUser("");
        setUserLoggedIn(false);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }

  return (
    <nav className="homepage-navbar">
      <img src="./icon.webp" alt="Icon" className="navbar-logo" />
      <h1 className="navbar-title">VideoTube</h1>
      <div className="auth-buttons">
        {userLoggedIn ? (
          <button className="auth-btn" onClick={handleUserLogout}>
            Logout
          </button>
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
