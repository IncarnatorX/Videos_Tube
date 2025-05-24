import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import api from "../../utils/api";
import { useState } from "react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleVerifyEmail(event) {
    event.preventDefault();
    setLoading(true);
    const verifyEmailObject = Object.fromEntries(new FormData(event.target));

    try {
      const response = await api.post("/send-otp", verifyEmailObject, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/verify-otp", {
          viewTransition: true,
          state: verifyEmailObject.email,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in handleVerifyEmail:", error.message);
      toast.error(error.response.data.message);
    }
    event.target.reset();
  }

  return (
    <div className="flex items-center justify-center h-dvh">
      <section className="text-white sm:w-[65%] sm:h-[60%] bg-black rounded-md p-6 flex flex-col items-center w-full">
        <h1 className="text-4xl/14 p-4">Enter Your Email </h1>
        <p className="text-gray-400">
          We&apos;ll send you a six digit PIN to your email for verification to
          reset your password.
        </p>
        <form className="px-4" onSubmit={handleVerifyEmail}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
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
              disabled={loading}
              value={loading ? "Sending OTP..." : "Send OTP"}
              className="bg-blue-600 py-2 px-4 rounded-4xl cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
            />
          </section>
        </form>
      </section>
    </div>
  );
};

export default VerifyEmail;
