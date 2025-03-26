import { Link, useLocation, useNavigate } from "react-router";
import Input from "./Input";
import { toast } from "react-toastify";
import api from "../../utils/api";

const VerifyOTP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    // const enteredOTP = Object.fromEntries(new FormData(event.target));

    // console.log(enteredOTP);

    // console.log(Object.values(enteredOTP).join(""));

    const enteredOTP = Object.values(
      Object.fromEntries(new FormData(event.target))
    ).join("");

    const verifyOTPObject = {
      otp: enteredOTP,
      email: state,
    };

    try {
      const response = await api.post("/verify-otp", verifyOTPObject, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/reset-pwd", { viewTransition: true, state });
      }
    } catch (error) {
      console.error("Error in VerifyOTP component: ", error.message);
      toast.error(error.response.data.message);
    }

    event.target.reset();
  }

  return (
    <div className="min-h-dvh content-center">
      <form
        className="flex flex-col items-center justify-around w-lg mx-auto bg-white rounded-xl p-5 gap-8"
        onSubmit={handleSubmit}
      >
        <h3 className="font-bold text-2xl">OTP Verification</h3>
        <p className="text-gray-600 font-normal text-sm">
          Please enter the verification code to your email address.
        </p>

        <div className="flex items-center justify-evenly gap-8">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            return <Input num={num} key={crypto.randomUUID()} />;
          })}
        </div>
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-md cursor-pointer text-white hover:bg-blue-600 transition-all text-sm"
        >
          Verify OTP
        </button>
        <Link to={"/"} className="hover:underline hover:text-blue-500">
          Go Home
        </Link>
      </form>
    </div>
  );
};

export default VerifyOTP;
