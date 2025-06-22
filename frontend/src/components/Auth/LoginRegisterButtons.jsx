import { useNavigate } from "react-router";

const LoginRegisterButtons = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="border-0 outline-0 rounded-md py-2 px-4 cursor-pointer bg-white text-black text-base mr-2 transition-all hover:bg-blue-600 hover:text-white"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
      <button
        className="border-0 outline-0 rounded-md py-2 px-4 cursor-pointer bg-white text-black text-base mr-2 transition-all hover:bg-red-600 hover:text-white"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
};

export default LoginRegisterButtons;
