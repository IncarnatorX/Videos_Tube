import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import BackButton from "../Buttons/BackButton";

const AuthLogin = () => {
  const navigate = useNavigate();

  const { setUserLoggedIn, setUser } = useContext(AuthContext);

  const handleAuthFormLogin = async (event) => {
    event.preventDefault();

    const authFormLoginObject = {};

    const formData = new FormData(event.target);

    for (const [name, value] of formData) {
      authFormLoginObject[name] = value;
    }

    event.target.reset();

    try {
      const response = await api.post("/login", authFormLoginObject, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message, user } = response.data;
      if (response.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(user));
        toast.success(message);
        navigate("/");
        setUser(user);
        setUserLoggedIn(true);
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

      <button type="submit" className="submit">
        Login{" "}
      </button>
    </form>
  );
};

export default AuthLogin;
