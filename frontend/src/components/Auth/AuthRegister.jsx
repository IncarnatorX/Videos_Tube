import { useNavigate } from "react-router";
import { toast } from "react-toastify";

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
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authFormRegisterObject),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/auth", { state: "login" });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error while submitting the form:", error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleAuthFormRegister}>
      <div style={{ width: "100%" }}>
        <button
          onClick={() => navigate("/")}
          className="back-btn"
          style={{ alignSelf: "flex-start" }}
        >
          <svg
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
          >
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          <span>Back</span>
        </button>
      </div>
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
