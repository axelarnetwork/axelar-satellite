import { Environment, loadChains } from "@axelar-network/axelarjs-sdk";

import { getDisabledChains } from ".";

export async function loadAllChains(environment: string) {
  // load chains
  const rawChains = await loadChains({
    environment: environment as Environment,
  });

  // filter out disabled chains
  const disabledChains = getDisabledChains();
  const allowedChains = rawChains
    .filter(
      (chain) =>
        !disabledChains?.includes(
          chain.chainIdentifier[environment as Environment]
        )
    )
    .sort((a, b) => a.chainName.localeCompare(b.chainName));

  return allowedChains;
}
