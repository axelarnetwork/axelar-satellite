import { formatUnits } from "ethers/lib/utils.js";
import { SpinnerDotted } from "spinners-react";

import { useSquidStateStore } from "~/store";

export const ReceiveTokenInfo = () => {
  const { routeDataLoading, routeData, selectedSquidAsset, isSquidTrade } =
    useSquidStateStore();

  if (!isSquidTrade) {
    return null;
  }

  return (
    <div className="mt-8 space-y-1">
      <div className="flex self-end justify-end space-x-2">
        <span className="text-xs text-gray-500">Receive (est.):</span>
        <span className="w-auto text-xs min-w-[20px] flex justify-end text-[#86d6ff]">
          {routeDataLoading ? (
            <SpinnerDotted
              className="text-blue-500"
              size={15}
              color="#00a6ff"
            />
          ) : routeData?.estimate && selectedSquidAsset ? (
            `${(+parseFloat(
              formatUnits(
                routeData.estimate.toAmount,
                selectedSquidAsset?.decimals
              )
            ).toFixed(5)).toString()} ${selectedSquidAsset.assetSymbol}`
          ) : (
            "NA"
          )}
        </span>
      </div>
    </div>
  );
};
