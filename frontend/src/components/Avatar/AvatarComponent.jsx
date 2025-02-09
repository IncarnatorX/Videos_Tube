import BackgroundLetterAvatars from "./BackgroundLetterAvatars";
import ImageAvatars from "./ImageAvatars";
import PropTypes from "prop-types";

const AvatarComponent = ({ owner }) => {
  return (
    <>
      {owner?.avatar ? (
        <ImageAvatars avatarSrc={owner?.avatar} />
      ) : (
        <BackgroundLetterAvatars fullname={owner?.fullname} />
      )}
    </>
  );
};

AvatarComponent.propTypes = {
  owner: PropTypes.object,
};

export default AvatarComponent;
