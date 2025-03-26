import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/Context";
import { toast } from "react-toastify";
import api from "../../utils/api";

const ResetPasswordComponent = () => {
  const { state: email } = useLocation();
  const navigate = useNavigate();
  const { setUser, setUserLoggedIn } = useContext(AuthContext);

  async function handleResetPasswordSubmit(event) {
    event.preventDefault();
    const resetPasswordData = Object.fromEntries(new FormData(event.target));
    resetPasswordData.email = email;
    event.target.reset();

    try {
      const response = await api.post("/reset-pwd", resetPasswordData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const { message } = response.data;
        toast.success(message);
        localStorage.removeItem("user");
        setUser(null);
        setUserLoggedIn(null);
        navigate("/auth", { state: "login" });
      }
    } catch (error) {
      console.error("Error in reset password component: ", error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-dvh">
      <section className="text-white sm:w-[65%] sm:h-[60%] bg-black rounded-md p-6 flex flex-col items-center w-full">
        <h1 className="text-4xl/14 p-4">Enter New Password</h1>
        <form className="px-4" onSubmit={handleResetPasswordSubmit}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="outline-none border-2 border-blue-600 p-4 rounded-md w-full"
          />
          <section className="flex gap-4 self-end mr-6">
            <button
              type="button"
              className="bg-red-600 p-2 px-4 rounded-4xl cursor-pointer"
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Submit"
              className="bg-blue-600 py-2 px-4 rounded-4xl cursor-pointer"
            />
          </section>
        </form>
      </section>
    </div>
  );
};

export default ResetPasswordComponent;
