import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/Context";
import { toast } from "react-toastify";
import api from "../../utils/api";
import BackButton from "../Buttons/BackButton/BackButton.jsx";

const AuthLogin = () => {
  const navigate = useNavigate();

  const { setUserLoggedIn, setUser, setAccessToken } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

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

      {/* LOGIN */}
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
      {/* PASSWORD */}
      <div className="auth-div">
        <label htmlFor="auth-password" className="label">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="auth-password"
          name="password"
          required
          className="auth-input"
        />
      </div>
      {/* SHOW PASSWORD */}
      <p className="flex gap-2 items-center mt-3">
        <input
          type="checkbox"
          name="show-password"
          id="show-password"
          className="w-4 h-4 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
        <span className="text-base">Show Password</span>
      </p>
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
