const getTimeDifference = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffInMs = now - createdDate; // Difference in milliseconds
  const diffInSeconds = Math.floor(diffInMs / 1000); // Convert to seconds

  if (diffInSeconds < 10) return "Just now";
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 2) return `${diffInHours} hour ago`;

  if (diffInHours < 24) return `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 2) return `${diffInDays} day ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

export default getTimeDifference;
