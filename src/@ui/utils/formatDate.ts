export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  const formattedTime = `${((hours + 11) % 12) + 1}:${minutes
    .toString()
    .padStart(2, "0")}${period}`;

  return `${formattedDate} (${formattedTime})`;
};
