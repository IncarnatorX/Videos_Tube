function ratingsDecimalFixer(video) {
  const rating =
    video?.comments?.reduce((sum, r) => sum + Number(r.comment), 0) /
    video.comments.length;

  // if rating is NaN then return 0. 0 indicates no comments
  if (isNaN(rating.toFixed(1))) {
    return 0;
  }
  return rating.toFixed(1);
}

export default ratingsDecimalFixer;
