export function extractDenom(denomString: string) {
  if (denomString.includes("/channel")) {
    const split = denomString.split("/");
    return split[split.length - 1];
  }
  return denomString;
}
