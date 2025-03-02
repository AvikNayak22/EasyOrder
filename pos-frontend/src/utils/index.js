export const getRandomBg = () => {
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-400",
    "bg-orange-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-red-500",
    "bg-green-500",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export const getAvatarName = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const formatDate = (date) => {
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
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
    2,
    "0"
  )}, ${date.getFullYear()}`;
};

export const formatTime = (date) => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
};

export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 12) {
    if (hour >= 17) {
      return "Evening";
    } else {
      return "Afternoon";
    }
  } else {
    return "Morning";
  }
};
