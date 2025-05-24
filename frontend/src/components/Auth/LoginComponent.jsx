import { useNavigate } from "react-router";
import "./LoginComponent.css";

const LoginComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="auth-btn login-btn" onClick={() => navigate("/login")}>
        Login
      </button>
      <button
        className="auth-btn register-btn"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
};

export default LoginComponent;
