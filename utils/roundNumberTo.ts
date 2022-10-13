export const roundNumberTo = (num: string, places: number) => {
  return Number(num).toFixed(
    Math.max(((num + "").split(".")[1] || "").length, places)
  );
};
