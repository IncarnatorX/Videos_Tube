import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { useNavigate } from "react-router";
import api from "../../utils/api";
import { toast } from "react-toastify";

const ConfirmPasswordComponent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleConfirmPassword(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    event.target.reset();

    try {
      const response = await api.post("/verify-password", data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const { message } = response.data;
        toast.success(message);
      }
    } catch (error) {
      console.error("Password couldn't be verified: ", error.message);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="text-white sm:w-[60%] h-[70%] bg-black rounded-md flex flex-col sm:flex-row items-center p-4">
        <section className="left sm:w-[35%] h-full text-4xl sm:border-r-2 flex justify-center items-center">
          <p className="w-full text-center">Hi {user.fullname}</p>
        </section>
        <section className="right w-[65%] p-3 flex flex-col gap-7 ml-3">
          <h1 className="text-4xl/14">Enter Password to Continue</h1>
          <form onSubmit={handleConfirmPassword}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="outline-none border-2 border-blue-600 p-4 rounded-md w-full"
            />
            <section className="flex items-center gap-4 self-end mr-6">
              <button
                type="button"
                className="bg-red-600 p-2 px-4 rounded-4xl cursor-pointer"
                onClick={() => navigate("/account")}
              >
                Cancel
              </button>
              <input
                type="submit"
                value="Next"
                className="bg-blue-600 py-2 px-4 rounded-4xl cursor-pointer"
              />
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ConfirmPasswordComponent;
