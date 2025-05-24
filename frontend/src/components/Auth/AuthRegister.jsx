import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../../utils/api.js";
import BackButton from "../Buttons/BackButton/BackButton.jsx";
import "./Auth.css";

const AuthRegister = () => {
  const navigate = useNavigate();

  // FUNCTION TO HANDLE FORM SUBMISSION
  const handleAuthFormRegister = async (event) => {
    event.preventDefault();

    const authFormRegisterObject = Object.fromEntries(
      new FormData(event.target)
    );

    if (
      authFormRegisterObject["password"] !==
      authFormRegisterObject["cnf-password"]
    ) {
      toast.error("Passwords do not match");
      return;
    }
    event.target.reset();

    try {
      const response = await api.post("/register", authFormRegisterObject, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        navigate("/auth", { state: "login" });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error while submitting the form:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen content-center">
      <form className="form" onSubmit={handleAuthFormRegister}>
        <div className="w-full grid grid-cols-3">
          <BackButton />
          <span className="auth-title">Register</span>
        </div>
        <div className="auth-div">
          <label htmlFor="auth-fullname" className="label">
            Fullname
          </label>
          <input
            type="text"
            id="auth-fullname"
            name="fullname"
            required
            className="auth-input"
          />
        </div>
        <div className="auth-div">
          <label htmlFor="auth-username" className="label">
            Username
          </label>
          <input
            type="text"
            id="auth-username"
            name="username"
            required
            className="auth-input"
          />
        </div>

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

        <div className="auth-div">
          <label htmlFor="auth-cnf-password" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            id="auth-cnf-password"
            name="cnf-password"
            required
            className="auth-input"
          />
        </div>

        <button type="submit" className="submit">
          Register{" "}
        </button>

        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Have an Account! Click to Login
        </span>
      </form>
    </div>
  );
};

export default AuthRegister;
