export const format = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
  });
};

