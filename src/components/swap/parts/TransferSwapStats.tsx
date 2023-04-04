import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import { formatEther } from "ethers/lib/utils.js";

import { AXELARSCAN_URL } from "~/config/constants";
import { getWagmiChains } from "~/config/web3";

import { useSquidStateStore, useSwapStore } from "~/store";

import { StatsWrapper } from "../../common";

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
    />
  </svg>
);

type RowProps = {
  text: string;
  tooltip: string;
};

export const Row: FC<PropsWithChildren<RowProps>> = ({
  text,
  tooltip,
  children,
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
        {routeDataLoading ? <LoadingRow /> : children}
      </span>
    </li>
  );
};

export const LoadingRow = () => (
  <div className="max-w-sm animate-pulse">
    <div className="w-24 h-1 bg-gray-500 rounded-full " />
  </div>
);

export const TransferSwapStats = () => {
  const { routeData, slippage, txReceipt, isSquidTrade } = useSquidStateStore();
  const srcChain = useSwapStore((state) => state.srcChain);

  function renderTxConfirmLink() {
    if (!txReceipt?.transactionHash) {
      return null;
    }
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
        <Image src={"/assets/ui/link.svg"} height={16} width={16} alt="link" />
      </a>
    );
  }

  if (!isSquidTrade) {
    return null;
  }

  return (
    <StatsWrapper>
      <ul className="space-y-2 text-sm">
        <Row text="Price Slippage" tooltip="Price Slippage Tolerance">
          {`${slippage}%` || "NA"}
        </Row>
        <Row
          text="Gas Cost (Native / USD-equiv)"
          tooltip={`Gas to be paid to initiate swap on ${srcChain.chainName}`}
        >
          {(routeData &&
            `${(+formatEther(
              routeData?.estimate?.gasCosts[0]?.amount || "0"
            )).toFixed(6)} ($${(+routeData?.estimate?.gasCosts[0]
              ?.amountUSD).toFixed(2)})`) ||
            "NA"}
        </Row>
        <Row text="Aggregate Price Impact" tooltip="Price impact">
          {routeData?.estimate?.aggregatePriceImpact || "NA"}
        </Row>
        <Row text="Exchange Rate" tooltip="Exchange Rate">
          {(+(routeData?.estimate?.exchangeRate || 0)).toFixed(5) || "NA"}
        </Row>
        {!isNaN(Number(routeData?.estimate?.estimatedRouteDuration)) && (
          <Row
            text="Average Processing Time (minutes)"
            tooltip="Average time for transaction completion"
          >
            {`~${Math.ceil(
              (routeData?.estimate?.estimatedRouteDuration as number) / 60
            ).toString()} minutes` || "NA"}
          </Row>
        )}
        {txReceipt && (
          <Row
            text={`${srcChain.chainName} Confirmation`}
            tooltip="Source chain transaction confirmation"
          >
            {renderTxConfirmLink()}
          </Row>
        )}
      </ul>
    </StatsWrapper>
  );
};

export default TransferSwapStats;
