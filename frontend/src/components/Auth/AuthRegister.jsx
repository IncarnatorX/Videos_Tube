import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../../utils/api.js";
import BackButton from "../Buttons/BackButton/BackButton.jsx";
import { Controller, useForm } from "react-hook-form";

const AuthRegister = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      "cnf-password": "",
    },
  });

  async function handleAuthFormRegister(authFormRegisterObject) {
    if (
      authFormRegisterObject["password"] !==
      authFormRegisterObject["cnf-password"]
    ) {
      // toast.error("Passwords do not match");
      setError("password", {
        message: "Passwords do not match.",
      });
      setError("cnf-password", {
        message: "Passwords do not match.",
      });
      return;
    } else {
      setError("password", {
        message: "",
      });
      setError("cnf-password", {
        message: "",
      });
    }

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
  }

  return (
    <div className="min-h-screen content-center">
      <form
        className="w-[80%] lg:w-[50%] bg-white p-5 shadow flex flex-col rounded-md items-center gap-y-2 mx-auto"
        // onSubmit={handleAuthFormRegister}
        onSubmit={handleSubmit(handleAuthFormRegister)}
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
          <Controller
            control={control}
            rules={{ required: "Fullname is required" }}
            name="fullname"
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  id="auth-fullname"
                  className="w-full text-base p-2.5 text-black border-2 border-gray-700 rounded-sm transition-all outline-0"
                />
                {errors?.fullname && (
                  <p className="text-sm text-red-500 font-bold">
                    {errors?.fullname?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-username" className="text-black mb-1">
            Username
          </label>
          <Controller
            control={control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  id="auth-username"
                  className="w-full text-base p-2.5 text-black border-2 border-gray-700 rounded-sm transition-all outline-0"
                />
                {errors?.username && (
                  <p className="text-sm text-red-500 font-bold">
                    {errors?.username?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

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
        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-password" className="text-black mb-1">
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
                  type="password"
                  id="auth-password"
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

        <div className="flex flex-col w-[70%]">
          <label htmlFor="auth-cnf-password" className="text-black mb-1">
            Confirm Password
          </label>

          <Controller
            control={control}
            name="cnf-password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="password"
                  id="auth-cnf-password"
                  className="w-full text-base p-2.5 text-black border-2 border-gray-700 rounded-sm transition-all outline-0"
                />
                {errors?.["cnf-password"] && (
                  <p className="text-sm text-red-500 font-bold">
                    {errors?.["cnf-password"]?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-fit bg-[var(--dark-background)] border-0 text-white rounded-sm py-2.5 px-5 cursor-pointer transition-all disabled:cursor-not-allowed disabled:bg-gray-500"
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
