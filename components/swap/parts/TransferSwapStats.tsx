import { useSquidStateStore, useSwapStore } from "../../../store";
import Image from "next/legacy/image";
import { formatEther, formatUnits } from "ethers/lib/utils.js";

import { StatsWrapper } from "../../common";
import { getWagmiChains } from "config/web3";
import { AXELARSCAN_URL } from "config/constants";

const InfoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="w-5 h-5 pb-1 mx-1 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export const TransferSwapStats = () => {
  const { routeData, selectedSquidAsset, slippage, txReceipt } =
    useSquidStateStore();
  const srcChain = useSwapStore((state) => state.srcChain);

  function renderTxConfirmLink() {
    if (!txReceipt.transactionHash) return null;
    const evmRpc = getWagmiChains().find(
      (network) =>
        network.networkNameOverride === srcChain.chainName?.toLowerCase()
    );
    const rootUrl =
      srcChain.module === "evm"
        ? `${evmRpc?.blockExplorers?.default.url}tx/`
        : `${AXELARSCAN_URL}/transfer/`;
    return (
      <a
        href={`${rootUrl}${txReceipt.transactionHash}`}
        target="_blank"
        rel="noreferrer"
        className="flex font-normal gap-x-2"
      >
        <span className="text-[#00a6ff]">
          View on{" "}
          {srcChain.module === "evm"
            ? evmRpc?.blockExplorers?.default?.name
            : "Axelarscan"}
        </span>
        <Image
          src={"/assets/ui/link.svg"}
          height={16}
          width={16}
          layout="intrinsic"
          alt="link"
        />
      </a>
    );
  }

  return (
    <StatsWrapper>
      <ul className="space-y-2 text-sm">
        <Row
          text="Price Slippage"
          tooltip="Slippage"
          data={`${slippage}%` || "NA"}
        />
        <Row
          text="Gas Cost (Native / USD-equiv)"
          tooltip={`Gas to be paid to initiate swap on ${srcChain.chainName}`}
          data={
            (routeData &&
              `${formatEther(
                routeData?.estimate?.gasCosts[0]?.amount as string
              )} ($${routeData?.estimate?.gasCosts[0]?.amountUSD})`) ||
            "NA"
          }
        />
        <Row
          text="Aggregate Price Impact"
          tooltip="Price impact"
          data={routeData?.estimate?.aggregatePriceImpact || "NA"}
        />
        <Row
          text="Exchange Rate"
          tooltip="Exchange Rate"
          data={routeData?.estimate?.exchangeRate || "NA"}
        />
        <Row
          text="Estimate Route Duration"
          tooltip=""
          data={routeData?.estimate?.estimatedRouteDuration.toString() || "NA"}
        />
        <Row
          text="Expected Amount Received"
          tooltip=""
          data={
            routeData && routeData.estimate && selectedSquidAsset
              ? `${(+parseFloat(
                  formatUnits(
                    routeData.estimate.toAmount,
                    selectedSquidAsset?.decimals
                  )
                ).toFixed(5)).toString()} ${selectedSquidAsset?.assetName}`
              : "NA"
          }
        />
        <Row
          text="Expected Amount Received (USD)"
          tooltip=""
          data={routeData?.estimate?.toAmountUSD || "NA"}
        />
        {txReceipt && (
          <Row
            text={`${srcChain.chainName} Confirmation`}
            tooltip="Source chain transaction confirmation"
            data={renderTxConfirmLink()}
          />
        )}
      </ul>
    </StatsWrapper>
  );
};

export const Row = ({
  text,
  tooltip,
  data,
}: {
  text: string;
  tooltip: string;
  data: any;
}) => {
  const { routeDataLoading } = useSquidStateStore();
  return (
    <li className="flex justify-between capitalize">
      <div
        className="flex items-center cursor-pointer tooltip tooltip-warning"
        data-tip={routeDataLoading ? "" : tooltip}
      >
        <span>{text}</span>
        {InfoIcon}
      </div>

      <span className="flex items-center font-semibold">
        {routeDataLoading ? <LoadingRow /> : data}
      </span>
    </li>
  );
};

export const LoadingRow = () => (
  <div className="max-w-sm animate-pulse">
    <div className="w-24 h-1 bg-gray-500 rounded-full "></div>
  </div>
);
