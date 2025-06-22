import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../../utils/api.js";
import BackButton from "../Buttons/BackButton/BackButton.jsx";

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
        navigate("/");
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
      <form
        className="w-[50%] bg-white p-5 shadow flex flex-col rounded-md items-center gap-y-2 mx-auto"
        onSubmit={handleAuthFormRegister}
      >
        <div className="w-full grid grid-cols-3">
          <BackButton />
          <span className="text-center text-2xl text-gray-800 content-center">
            Register
          </span>
        </div>
        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-fullname" className="text-black mb-1">
            Fullname
          </label>
          <input
            type="text"
            id="auth-fullname"
            name="fullname"
            required
            className="w-full text-base p-2.5 text-black border-2 border-gray-400 rounded-sm transition-all outline-0 focus:border-gray-700 valid:border-green-600"
          />
        </div>
        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-username" className="text-black mb-1">
            Username
          </label>
          <input
            type="text"
            id="auth-username"
            name="username"
            required
            className="w-full text-base p-2.5 text-black border-2 border-gray-400 rounded-sm transition-all outline-0 focus:border-gray-700 valid:border-green-600"
          />
        </div>

        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-email" className="text-black mb-1">
            Email
          </label>

          <input
            type="email"
            id="auth-email"
            name="email"
            required
            className="w-full text-base p-2.5 text-black border-2 border-gray-400 rounded-sm transition-all outline-0 focus:border-gray-700 valid:border-green-600"
          />
        </div>
        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-password" className="text-black mb-1">
            Password
          </label>
          <input
            type="password"
            id="auth-password"
            name="password"
            required
            className="w-full text-base p-2.5 text-black border-2 border-gray-400 rounded-sm transition-all outline-0 focus:border-gray-700 valid:border-green-600"
          />
        </div>

        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-cnf-password" className="text-black mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="auth-cnf-password"
            name="cnf-password"
            required
            className="w-full text-base p-2.5 text-black border-2 border-gray-400 rounded-sm transition-all outline-0 focus:border-gray-700 valid:border-green-600"
          />
        </div>

        <button
          type="submit"
          className="w-fit bg-[var(--dark-background)] border-0 text-white rounded-sm py-2.5 px-5 cursor-pointer transition-all"
        >
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
