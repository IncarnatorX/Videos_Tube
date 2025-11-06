function formatUser(userToBeFormatted) {
  const {
    _id,
    username,
    fullname,
    email,
    createdAt,
    updatedAt,
    likedVideos,
    watchHistory,
    loggedIn,
    avatar,
  } = userToBeFormatted;

  const user = {
    _id,
    username,
    fullname,
    email,
    createdAt,
    updatedAt,
    likedVideos,
    watchHistory,
    loggedIn,
    avatar,
  };

  return user;
}

export default formatUser;
