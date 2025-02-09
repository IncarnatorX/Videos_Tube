import PropTypes from "prop-types";
import getCreatedAtFormatted from "../../utils/getCreatedAt";

const MyAccountDetails = ({ user }) => {
  console.log(user);

  return (
    <div className="grid grid-cols-12 text-white p-6">
      <div className="col-span-2 content-center">
        <img src={user.avatar} className="rounded-[50%]" />
      </div>
      <div className="col-span-10 flex flex-col gap-4">
        <p className="text-4xl">
          {user?.fullname[0].toUpperCase() + user?.fullname.slice(1)}
        </p>
        <p>Username: @{user.username}</p>
        <p>Email: {user.email}</p>
        <p>Joined {getCreatedAtFormatted(user.createdAt)} </p>
      </div>
    </div>
  );
};

MyAccountDetails.propTypes = {
  user: PropTypes.object,
};

export default MyAccountDetails;
