import { useState } from "react";
import { useNavigate } from "react-router";
// import { AuthContext } from "../../Context/Context";
import toast from "react-hot-toast";
import api from "../../utils/api";
import BackButton from "../Buttons/BackButton/BackButton.jsx";
import { useAuthStore } from "../../store/authStore.js";
import { Controller, useForm } from "react-hook-form";

const AuthLogin = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ defaultValues: { email: "", password: "" } });

  // const { setUserLoggedIn, setUser, setAccessToken } = useContext(AuthContext);
  const { setUserLoggedIn, setUser, setAccessToken } = useAuthStore(
    (store) => store,
  );
  const [showPassword, setShowPassword] = useState(false);

  async function handleAuthFormLogin(authFormLoginObject) {
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
        `Login Error: ${error.response.data.message || error.message}`,
      );
      navigate("/login");
      reset();
    }
  }

  return (
    <div className="min-h-screen content-center">
      <form
        className="w-[80%] lg:w-[50%] bg-white p-5 shadow flex flex-col rounded-md items-center gap-y-2 mx-auto"
        // onSubmit={handleAuthFormLogin}
        onSubmit={handleSubmit(handleAuthFormLogin)}
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

          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="email"
                  id="auth-email"
                  className="w-full text-base p-2.5 text-black border-2 border-gray-700 rounded-sm transition-all outline-0"
                />
                {errors?.email && (
                  <p className="text-sm text-red-500 font-bold">
                    {errors?.email?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        {/* PASSWORD */}
        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-password" className="label">
            Password
          </label>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  id="auth-password"
                  minLength={8}
                  className="w-full text-base p-2.5 text-black border-2 border-gray-700 rounded-sm transition-all outline-0"
                />
                {errors?.password && (
                  <p className="text-sm text-red-500 font-bold">
                    {errors?.password?.message}
                  </p>
                )}
              </>
            )}
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
            <label htmlFor="show-password" className="text-base">
              Show Password
            </label>
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
          disabled={!isValid}
          className="w-fit bg-[var(--dark-background)] border-0 text-white rounded-sm py-2.5 px-5 cursor-pointer transition-all disabled:cursor-not-allowed disabled:bg-gray-500"
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
