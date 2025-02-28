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
