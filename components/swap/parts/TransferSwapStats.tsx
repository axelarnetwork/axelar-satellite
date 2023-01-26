import { useSquidStateStore, useSwapStore } from "../../../store";

import { formatUnits } from "ethers/lib/utils.js";

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
    ></path>
  </svg>
);

export const TransferSwapStats = () => {
  const { srcChain, destChain, asset } = useSwapStore((state) => state);
  const { routeData, selectedSquidAsset } = useSquidStateStore();

  if (!routeData) return null;
  if (!routeData.estimate) return null;

  const { estimate } = routeData;
  const {
    aggregatePriceImpact,
    estimatedRouteDuration,
    exchangeRate,
    toAmount,
    toAmountMin,
    toAmountUSD,
  } = estimate;

  return (
    <StatsWrapper>
      <ul className="space-y-2 text-sm">
        <Row
          text="Aggregate Price Impact"
          tooltip="Price impact"
          data={aggregatePriceImpact}
        />
        <Row
          text="Estimate Route Duration"
          tooltip=""
          data={estimatedRouteDuration.toString()}
        />
        <Row
          text="Expected Amount Received"
          tooltip=""
          data={`${(+parseFloat(
            formatUnits(toAmount, selectedSquidAsset?.decimals)
          ).toFixed(5)).toString()} ${selectedSquidAsset?.assetName}`}
        />
        <Row
          text="Expected Amount Received (USD)"
          tooltip=""
          data={toAmountUSD}
        />
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
  data: string;
}) => {
  return (
    <li className="flex justify-between">
      <div
        className="flex items-center cursor-pointer tooltip tooltip-warning"
        data-tip={tooltip}
      >
        <span>{text}</span>
        {InfoIcon}
      </div>
      <span className="font-semibold">{data}</span>
    </li>
  );
};
