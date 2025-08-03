import { useState } from "react";
import { useNavigate } from "react-router";
// import { AuthContext } from "../../Context/Context";
import toast from "react-hot-toast";
import api from "../../utils/api";
import BackButton from "../Buttons/BackButton/BackButton.jsx";
import { useAuthStore } from "../../store/authStore.js";

const AuthLogin = () => {
  const navigate = useNavigate();

  // const { setUserLoggedIn, setUser, setAccessToken } = useContext(AuthContext);
  const { setUserLoggedIn, setUser, setAccessToken } = useAuthStore(
    (store) => store
  );
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
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen content-center">
      <form
        className="w-[80%] lg:w-[50%] bg-white p-5 shadow flex flex-col rounded-md items-center gap-y-2 mx-auto"
        onSubmit={handleAuthFormLogin}
      >
        <div className="w-full grid grid-cols-3">
          <BackButton />
          <span className="text-center text-2xl text-gray-800 content-center">
            Login
          </span>
        </div>

        {/* LOGIN */}
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
        {/* PASSWORD */}
        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-password" className="label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="auth-password"
            name="password"
            required
            minLength={8}
            className="w-full text-base p-2.5 text-black border-2 border-gray-400 rounded-sm transition-all outline-0 focus:border-gray-700 valid:border-green-600"
          />
        </div>
        <section className="flex items-center justify-between w-[70%] py-4">
          {/* SHOW PASSWORD */}
          <p className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="show-password"
              id="show-password"
              className="w-4 h-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
            <span className="text-base">Show Password</span>
          </p>
          {/* FORGOT PASSWORD */}
          <p
            onClick={() => navigate("/verify-email", { viewTransition: true })}
            className="text-blue-600 font-semibold cursor-pointer text-center hover:underline"
          >
            Forgot password?
          </p>
        </section>
        <button
          type="submit"
          className="w-fit bg-[var(--dark-background)] border-0 text-white rounded-sm py-2.5 px-5 cursor-pointer transition-all"
        >
          Login
        </button>
        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Don&apos;t have Account! Register here
        </span>
      </form>
    </div>
  );
};

export default AuthLogin;
