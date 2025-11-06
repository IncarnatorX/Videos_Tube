import PropTypes from "prop-types";
import "./MyAccountPublishVideos.css";

const MyAccountPublishVideos = ({
  userVideos,
  handleEditDialogOpening,
  handleReuploadDialogOpen,
}) => {
  // console.log("userVideos", userVideos);

  return (
    <div className="text-white">
      <h3 className="my-4 text-center text-2xl">Published Videos</h3>
      <div>
        {userVideos.map((video) => {
          return (
            <div key={video._id} className="flex p-4 gap-4">
              <div>
                <img
                  src={video.thumbnail}
                  alt="Thumbnail"
                  className="w-70 rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-2xl">Title: {video.title}</p>
                <p>Views: {video.views}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditDialogOpening(video._id)}
                    className="btn edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleReuploadDialogOpen(video._id)}
                    className="btn re-upload-button"
                  >
                    Re-Upload
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAccountPublishVideos;

MyAccountPublishVideos.propTypes = {
  userVideos: PropTypes.array,
  handleEditDialogOpening: PropTypes.func,
  handleReuploadDialogOpen: PropTypes.func,
};
