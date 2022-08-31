import { getSelectedAssetSymbol, useSwapStore } from "../../../store";
import { StatsWrapper } from "../../common";
import UseGatewayQuery from "../../../hooks/useGatewayQuery";
import { commify } from "ethers/lib/utils";
import { renderGasFee } from "../../../utils/renderGasFee";
import { AssetConfig } from "@axelar-network/axelarjs-sdk";

export const InitialStats = () => {
  const { srcChain, destChain, asset } = useSwapStore((state) => state);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);
  const max = UseGatewayQuery();

  function renderWaitTime() {
    if (!srcChain) return "";

    if (srcChain.module === "axelarnet") return "~2 minutes";

    if (["ethereum", "polygon"].includes(srcChain.chainName.toLowerCase()))
      return "~15 minutes";

    return "~3 minutes";
  }

  function renderMax() {
    return (
      max && (+max > 0) && (
        <li className="flex justify-between">
          <span>Maximum Transfer Amount:</span>
          <span className="font-semibold">
            {commify(max)} {selectedAssetSymbol}
          </span>
        </li>
      )
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
        {destChain?.module === "evm" && renderMax()}
        <li className="flex justify-between ">
          <span>Estimated wait time:</span>
          <span className="font-semibold">{renderWaitTime()}</span>
        </li>
      </ul>
    </StatsWrapper>
  );
};
