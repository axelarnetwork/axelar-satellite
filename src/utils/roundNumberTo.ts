export const roundNumberTo = (num: string, places: number) => {
  if (isNaN(Number(num))) {
    return "...";
  }

  const number = Number(num).toFixed(
    Math.max((`${num}`.split(".")[1] || "").length, places)
  );
  return number;
};
