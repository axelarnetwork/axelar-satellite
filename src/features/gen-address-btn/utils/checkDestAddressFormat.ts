import { ChainInfo } from "@axelar-network/axelarjs-sdk";

import { validateCosmosAddress, validateEvmAddress } from "~/utils/address";
import { showErrorMsgAndThrow } from "~/utils/error";

export function checkDestAddressFormat(
  destChain: ChainInfo,
  destAddress: string
) {
  const destModule = destChain.module;
  if (destModule === "evm") {
    const addressOk = validateEvmAddress(destAddress);
    if (!addressOk) {
      showErrorMsgAndThrow(`Address ${destAddress} is not a valid EVM address`);
    }
  } else if (destModule === "axelarnet") {
    const addressOk = validateCosmosAddress(
      destAddress,
      destChain.addressPrefix
    );
    if (!addressOk) {
      showErrorMsgAndThrow(
        `Address ${destAddress.substring(0, 10)}... is not a valid ${
          destChain.chainSymbol
        } address`
      );
    }
  }
}
