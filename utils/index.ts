export function buildDepositConfirmationRoomId(
  module: string,
  depositAddress: string
): string {
  const topic = {
    type: "deposit-confirmation",
    sourceModule: module.toLowerCase(),
    depositAddress,
  };

  return JSON.stringify(topic, Object.keys(topic).sort());
}

export function buildEvmTransferCompletedRoomId(
  destinationAddress: string,
  assetFullDenom: string
): string {
  const topic = {
    type: "transfer-complete",
    sourceModule: "evm",
    destinationAddress,
    denom: assetFullDenom,
  };

  return JSON.stringify(topic, Object.keys(topic).sort());
}

export function curateCosmosChainId(chainId: string) {
  switch (chainId) {
    case "terra-2":
      return "pisco-1";
    case "osmo-4":
      return "osmo-test-4";
    default:
      return chainId;
  }
}
