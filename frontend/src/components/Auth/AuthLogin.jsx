import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import BackButton from "../Buttons/BackButton/BackButton.jsx";

const AuthLogin = () => {
  const navigate = useNavigate();

  const { setUserLoggedIn, setUser, setAccessToken } = useContext(AuthContext);

  const handleAuthFormLogin = async (event) => {
    event.preventDefault();

    const authFormLoginObject = Object.fromEntries(new FormData(event.target));

    event.target.reset();

    try {
      const response = await api.post("/login", authFormLoginObject, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const { message, user, accessToken } = response.data;
        setAccessToken(accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(message);
        setUser(user);
        setUserLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        `Login Error: ${error.response.data.message || error.message}`
      );
      navigate("/auth", { state: "login" });
    }
  };

  return (
    <form className="form" onSubmit={handleAuthFormLogin}>
      <BackButton />
      <span className="auth-title">Login</span>

      <div className="auth-div">
        <label htmlFor="auth-email" className="label">
          Email
        </label>

        <input
          type="email"
          id="auth-email"
          name="email"
          required
          className="auth-input"
        />
      </div>
      <div className="auth-div">
        <label htmlFor="auth-password" className="label">
          Password
        </label>
        <input
          type="password"
          id="auth-password"
          name="password"
          required
          className="auth-input"
        />
      </div>
      <p
        onClick={() => navigate("/verify-email", { viewTransition: true })}
        className="text-blue-600 font-semibold cursor-pointer self-start ml-23 pt-2 hover:underline"
      >
        Forgot password?
      </p>
      <button type="submit" className="submit">
        Login
      </button>
    </form>
  );
};

export default AuthLogin;
