import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { useNavigate } from "react-router";
import getCreatedAtFormatted from "../../utils/getCreatedAt";
import EditAvatarButton from "../Buttons/EditAvatarButton/EditAvatarButton";
import PropTypes from "prop-types";

const MyAccountDetails = ({ editAvatarRef }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleEditAvatarDialog() {
    if (editAvatarRef.current) {
      editAvatarRef.current.showModal();
    }
  }
  return (
    <>
      <h2 className="text-center py-2 text-white text-2xl ">My Account</h2>
      <div className="grid grid-cols-12 text-white p-6">
        <div className="col-span-2 flex flex-col justify-center items-center">
          <img src={user.avatar} className="rounded-[50%]" />
          <EditAvatarButton handleEditAvatarDialog={handleEditAvatarDialog} />
        </div>
        <div className="col-span-10 flex flex-col gap-4">
          <p className="text-4xl">
            {user.fullname[0].toUpperCase() + user.fullname.slice(1)}
          </p>
          <p>Username: @{user.username}</p>
          <p>
            Email: {user.email}{" "}
            <button className="bg-gray-500 cursor-pointer ml-2 px-2 outline-none rounded-lg text-sm">
              Edit email
            </button>
          </p>
          <p>Joined {getCreatedAtFormatted(user.createdAt)} </p>
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

MyAccountDetails.propTypes = {
  editAvatarRef: PropTypes.object,
};

export default MyAccountDetails;
