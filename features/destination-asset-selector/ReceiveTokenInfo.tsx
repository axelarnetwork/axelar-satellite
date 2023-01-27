import { useSquidStateStore, useSwapStore } from "store";

import { SpinnerDotted } from "spinners-react";
import { formatUnits } from "ethers/lib/utils.js";

export const ReceiveTokenInfo = () => {
  const { routeDataLoading, routeData, selectedSquidAsset } =
    useSquidStateStore();

  const srcChain = useSwapStore((state) => state.srcChain);

  if (srcChain?.chainName?.toLowerCase() !== "terra")
    return (
      <div className="mt-5 space-y-1">
        <div className="flex self-end justify-end space-x-2">
          <span className="text-xs text-gray-500">Receive Amount:</span>
          <span className="w-auto text-xs min-w-[20px] flex justify-end text-[#86d6ff]">
            {routeDataLoading ? (
              <SpinnerDotted
                className="text-blue-500"
                size={15}
                color="#00a6ff"
              />
            ) : routeData && routeData.estimate && selectedSquidAsset ? (
              `${(+parseFloat(
                formatUnits(
                  routeData.estimate.toAmount,
                  selectedSquidAsset?.decimals
                )
              ).toFixed(5)).toString()} ${selectedSquidAsset.assetSymbol}`
            ) : (
              "0"
            )}
          </span>
        </div>
      </div>
    );
};
