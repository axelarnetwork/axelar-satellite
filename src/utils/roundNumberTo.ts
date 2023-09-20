export function roundNumberTo(num: string, places: number) {
  // remove commas
  const sanitized = parseFloat(num.replace(/,/g, ""));

  if (isNaN(sanitized)) {
    return "...";
  }

  const number = sanitized.toFixed(
    Math.max((`${sanitized}`.split(".")[1] || "").length, places)
  );
  return number;
}
