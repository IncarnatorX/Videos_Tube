// import { useContext } from "react";
// import { AuthContext } from "../../Context/Context";
import { useNavigate } from "react-router";
import getCreatedAtFormatted from "../../utils/getCreatedAt";
import EditAvatarButton from "../Buttons/EditAvatarButton/EditAvatarButton";
import { useAuthStore } from "../../store/authStore";
import stringToColor from "../../utils/stringToColor";
import { useEffect, useState } from "react";

const MyAccountDetails = () => {
  // const { user } = useContext(AuthContext);
  const { user } = useAuthStore((store) => store);
  console.log(user);
  const navigate = useNavigate();

  const [userBGColorCode, setUserBGColorCode] = useState("");

  useEffect(() => {
    const fullname = user?.fullname;
    if (!fullname) return;

    const colorCode = stringToColor(fullname);

    setUserBGColorCode(colorCode);
  }, [user?.fullname]);

  return (
    <>
      <h2 className="text-center py-2 text-white text-2xl">My Account</h2>
      <div className="flex text-white gap-2 p-6">
        <div className="flex flex-col justify-center items-center gap-4 p-2">
          {user?.avatar ? (
            <img src={user?.avatar} className="rounded-[50%] w-36 h-36" />
          ) : (
            <div
              className={`text-9xl rounded-full ${
                userBGColorCode ? `bg-[${userBGColorCode}]` : "bg-gray-500"
              } w-40 h-40 grid place-items-center`}
            >
              {user?.fullname?.[0]?.toUpperCase()}
            </div>
          )}
          <EditAvatarButton />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-4xl">
            {user?.fullname?.[0].toUpperCase() + user?.fullname?.slice(1)}
          </p>
          <p>Username: @{user?.username}</p>
          <p>
            Email: {user.email}{" "}
            <button className="bg-gray-500 cursor-pointer ml-2 px-2 outline-none rounded-lg text-sm">
              Edit email
            </button>
          </p>
          <p>Joined {getCreatedAtFormatted(user?.createdAt)} </p>
          <button
            className="bg-green-400 rounded-md outline-none border-none text-white cursor-pointer px-2 py-1 w-fit"
            onClick={() => navigate("/cnf-pwd", { viewTransition: true })}
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccountDetails;
