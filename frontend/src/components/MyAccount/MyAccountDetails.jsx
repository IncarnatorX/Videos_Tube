import PropTypes from "prop-types";
import getCreatedAtFormatted from "../../utils/getCreatedAt";
import EditAvatarButton from "../Buttons/EditAvatarButton/EditAvatarButton";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";

const MyAccountDetails = ({ editAvatarRef }) => {
  const { user } = useContext(AuthContext);

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
        </div>
      </div>
    </>
  );
};

MyAccountDetails.propTypes = {
  editAvatarRef: PropTypes.object,
};

export default MyAccountDetails;
