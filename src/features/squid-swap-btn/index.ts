export * from "./SquidSwapBtn";

export const parseSquidError = (err: string) => {
  if (err.toLowerCase().includes("user rejected")) {
    return "User cancelled transaction";
  }
  return "Could not execute transaction for asset/chain combination. Please try again later";
};
