import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComponent = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transitionBounce
      />
    </div>
  );
};

export default ToastComponent;
