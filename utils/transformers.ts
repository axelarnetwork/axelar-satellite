/**
 * Converts long chain names into shorter onces
 */
export function convertChainName(chainName: string) {
  switch (chainName) {
    case "Cosmoshub":
      return "Cosmos";
    default:
      return chainName;
  }
}
