import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/Context";
import LogoutComponent from "../Auth/LogoutComponent";
import LoginRegisterButtons from "../Auth/LoginRegisterButtons";

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useContext(AuthContext);
  return (
    <nav className="flex items-center justify-between p-2">
      <img
        src="./icon.webp"
        alt="Icon"
        className="w-12 h-12 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1 className="navbar-title">VideoTube</h1>
      <div className="flex items-center justify-center p-2">
        {userLoggedIn ? <LogoutComponent /> : <LoginRegisterButtons />}
      </div>
    </nav>
  );
};

export default Navbar;
