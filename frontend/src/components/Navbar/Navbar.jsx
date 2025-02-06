import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
// import axios from "axios";
import api from "../../utils/api";
import { toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn, user, setUser, setUserLoggedIn } =
    useContext(AuthContext);

  async function handleUserLogout() {
    try {
      const response = await api.post("/logout", user._id, {
        withCredentials: true,
      });

      if (response.status === 200) {
        sessionStorage.removeItem("user");
        setUser("");
        setUserLoggedIn(false);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error while logging out!!");
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
