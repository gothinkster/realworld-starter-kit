export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("default", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
