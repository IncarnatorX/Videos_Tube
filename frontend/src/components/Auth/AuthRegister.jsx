import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../utils/api.js";
import BackButton from "../Buttons/BackButton.jsx";

const AuthRegister = () => {
  const navigate = useNavigate();

  // FUNCTION TO HANDLE FORM SUBMISSION
  const handleAuthFormRegister = async (event) => {
    event.preventDefault();

    const authFormRegisterObject = {};

    const formData = new FormData(event.target);

    for (const [name, value] of formData) {
      authFormRegisterObject[name] = value;
    }

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
      console.error("Error while submitting the form:", error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleAuthFormRegister}>
      <BackButton />
      <span className="auth-title">Register</span>

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
    </form>
  );
};

export default AuthRegister;
