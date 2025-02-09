const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getCreatedAtFormatted(createdAt) {
  const mongoDate = new Date(createdAt);
  const year = mongoDate.getFullYear();
  const month = mongoDate.getMonth();
  const date = mongoDate.getDate();
  const formattedDate = `${date} ${months[month]} ${year}.`;

  return formattedDate;
}

export default getCreatedAtFormatted;
