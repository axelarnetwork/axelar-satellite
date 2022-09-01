import { getSelectedAssetSymbol, useSwapStore } from "../../../store";
import { AssetConfig } from "@axelar-network/axelarjs-sdk";
import { commify } from "ethers/lib/utils";

import { StatsWrapper } from "../../common";
import { renderGasFee } from "../../../utils/renderGasFee";
import { useGatewayQuery } from "../../../hooks";

export const TransferStats = () => {
  const { srcChain, destChain, asset } = useSwapStore((state) => state);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);
  const max = useGatewayQuery();

  function renderWaitTime() {
    if (!srcChain) return "";

    if (srcChain.module === "axelarnet") return "~2 minutes";

    if (["ethereum", "polygon"].includes(srcChain.chainName.toLowerCase()))
      return "~15 minutes";

    return "~3 minutes";
  }

  function renderMaxTransferAmount() {
    if (max && Number(max) > 0) {
      return (
        <li className="flex justify-between">
          <span>Maximum Transfer Amount:</span>
          <span className="font-semibold">
            {commify(max)} {selectedAssetSymbol}
          </span>
        </li>
      );
    }
    return (
      <li className="flex justify-between">
        <span>Maximum Transfer Amount:</span>
        <span className="italic font-light">unlimited</span>
      </li>
    );
  }

  return (
    <StatsWrapper>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span>Relayer Gas Fees:</span>
          <span className="font-semibold">
            {renderGasFee(srcChain, destChain, asset as AssetConfig)}{" "}
            {selectedAssetSymbol}
          </span>
        </li>
        <li className="flex justify-between ">
          <span>Estimated wait time:</span>
          <span className="font-semibold">{renderWaitTime()}</span>
        </li>
        {renderMaxTransferAmount()}
      </ul>
    </StatsWrapper>
  );
};
