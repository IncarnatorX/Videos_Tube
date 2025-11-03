import { BrowserRouter } from "react-router";
import ToastComponent from "./components/ToastContainer";
// import AuthProvider from "./Context/AuthContext";
// import VideoProvider from "./Context/VideoContext";
import { ErrorBoundary } from "react-error-boundary";
import PageNotFound from "./components/Page-Not-Found/PageNotFound";
import AllRoutes from "./components/Routes/AllRoutes";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const {
    // user,
    getUserFromLocalStorage,
    // setUser,
    // setUserLoggedIn,
    // setAccessToken,
  } = useAuthStore((store) => store);

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  // useEffect(() => {
  //   if (!user) return;

  //   function logoutUser() {
  //     fetch("http://localhost:8080/logout", {
  //       credentials: "include",
  //       keepalive: true,
  //     });

  //     localStorage.removeItem("user");
  //     setUser(null);
  //     setUserLoggedIn(false);
  //     setAccessToken(null);
  //   }

  //   window.addEventListener("beforeunload", logoutUser);

  //   return () => {
  //     window.removeEventListener("beforeunload", logoutUser);
  //   };
  // }, [user]);

  return (
    <>
      <BrowserRouter>
        <ErrorBoundary fallback={<PageNotFound />}>
          {/* <VideoProvider> */}
          {/* <AuthProvider> */}
          <AllRoutes />
          {/* </AuthProvider> */}
          {/* </VideoProvider> */}
        </ErrorBoundary>
      </BrowserRouter>
      <ToastComponent />
    </>
  );
};

export default App;
