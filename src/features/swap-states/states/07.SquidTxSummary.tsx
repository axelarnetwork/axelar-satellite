import Image from "next/image";
import { Call, Route, RouteData, Swap } from "@0xsquid/sdk";
import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { formatUnits } from "ethers/lib/utils.js";

import { InputWrapper } from "~/components/common";

import { useSquidStateStore, useSwapStore } from "~/store";

import { SwapStatus } from "~/utils/enums";

import { ProgressBar } from "../components";

const ShowSwapRouteOnChain = ({
  squidChainInfo,
  chainInfo,
}: {
  squidChainInfo: Route;
  chainInfo: ChainInfo;
}) => {
  if (!squidChainInfo?.length) return null;

  return (
    <>
      {(squidChainInfo as Route).map((chInfo: Call | Swap, index: number) => {
        if (chInfo.type === "SWAP") {
          const info: Swap = { ...chInfo } as Swap;
          return (
            <div
              key={`route-${info.fromToken.chainId}-${index}`}
              className="flex flex-row justify-start w-full"
            >
              <CheckIcon />
              <div className="w-full text-xs">
                Swap ~
                {Number(
                  formatUnits(info.fromAmount, info.fromToken.decimals)
                ).toPrecision(4)}{" "}
                {info.fromToken.symbol} to ~
                {Number(
                  formatUnits(info.toAmount, info.toToken.decimals)
                ).toPrecision(4)}{" "}
                {info.toToken.symbol} on {chainInfo.chainName}
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="green"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const SquidTxSummary = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const statusResponse = useSquidStateStore((state) => state.statusResponse);
  const routeData = useSquidStateStore((state) => state.routeData);

  const showRouteData = () => {
    if (!routeData) return;
    const {
      estimate: {
        route: { fromChain, toChain },
        sendAmount,
      },
    } = { ...routeData } as RouteData;

    return (
      <div className="flex flex-col items-center w-full my-2">
        <ShowSwapRouteOnChain squidChainInfo={fromChain} chainInfo={srcChain} />
        <div
          key={`route-usdc-${srcChain.chainName}`}
          className="flex flex-row justify-start w-full"
        >
          <CheckIcon />
          <div className="w-full text-xs">
            Send ~{Number(formatUnits(sendAmount, 6)).toPrecision(4)}{" "}
            {srcChain.id.includes("ethereum") ? "USDC" : "axlUSDC"} to{" "}
            {destChain.chainName}
          </div>
        </div>
        <ShowSwapRouteOnChain squidChainInfo={toChain} chainInfo={destChain} />
      </div>
    );
  };

  function renderTxConfirmationInfo() {
    return (
      <div className="flex flex-col justify-center h-full text-base text-md gap-y-1">
        <h2 className="text-lg font-bold text-center">Swap Complete!</h2>
        {showRouteData()}
        <div className="my-0 divider" />

        <a
          className="flex justify-center w-full text-primary hover:underline gap-x-2"
          href={statusResponse?.axelarTransactionUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>{"Visit Axelarscan for more information"}</span>
          <Image src="/assets/ui/link.svg" height={16} width={16} alt="link" />
        </a>
      </div>
    );
  }

  if (swapStatus !== SwapStatus.SQUID_FINISHED) {
    return null;
  }

  return (
    <>
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="relative flex flex-col h-full">
              <ProgressBar currentLevel={5} maxLevels={5} />
              <div className="flex items-center justify-center h-full py-4 mt-auto text-xs gap-x-2">
                {renderTxConfirmationInfo()}
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};

export default SquidTxSummary;
