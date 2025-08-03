// import { useContext } from "react";
// import { AuthContext } from "../../Context/Context";
import { Navigate } from "react-router";
import PropTypes from "prop-types";
import { useAuthStore } from "../../store/authStore";
// import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  // const { user } = useContext(AuthContext);

  const user = useAuthStore((store) => store.user);

  // if (!user) {
  //   toast.error("You must be logged in first.");
  // }

  return user ? children : <Navigate to="/" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
