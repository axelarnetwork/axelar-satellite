export function roundNumberTo(num: string, places: number) {
  // remove commas
  const sanitized = num.replace(/,/g, "");

  if (isNaN(parseFloat(sanitized))) {
    return "...";
  }

  const [, decimals] = sanitized.split(".");

  const number = Number(sanitized).toLocaleString("en", {
    minimumFractionDigits: Math.max(decimals?.length ?? 0, places),
  });

  return number;
}
