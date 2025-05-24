import { useNavigate } from "react-router";
import api from "../../utils/api";
import toast from "react-hot-toast";

import { useContext } from "react";
import { AuthContext } from "../../Context/Context";

const ChangePasswordComponent = () => {
  const navigate = useNavigate();

  const { setUser, setUserLoggedIn } = useContext(AuthContext);

  async function handleChangePassword(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    e.target.reset();

    try {
      const response = await api.post("/change-pwd", formData, {
        withCredentials: true,
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
      console.error("Error in password change component: ", error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-dvh">
      <section className="text-white sm:w-[65%] sm:h-[60%] bg-black rounded-md p-6 flex flex-col items-center w-full">
        <h1 className="text-4xl/14 p-4">Enter New Password</h1>
        <form className="px-4" onSubmit={handleChangePassword}>
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
              onClick={() => navigate(-1)}
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

export default ChangePasswordComponent;
