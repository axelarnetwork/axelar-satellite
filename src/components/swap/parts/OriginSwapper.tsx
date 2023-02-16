import React from "react";
import cn from "classnames";

import { useSwapStore } from "~/store";

import { SwapOrigin } from "~/utils/enums";

const tooltipMessage = `Select "exchange" if you plan on executing a transfer from an exchange wallet. Satellite will generate a deposit address. You can wire your funds directly from your favourite exchange.`;

export const OriginSwapper = () => {
  const { swapOrigin, setSwapOrigin } = useSwapStore((state) => state);

  function toggleSwapOrigin() {
    if (swapOrigin === SwapOrigin.APP) {
      return setSwapOrigin(SwapOrigin.EXCHANGE);
    }
    return setSwapOrigin(SwapOrigin.APP);
  }

  return (
    <div className="flex justify-center text-xs font-medium">
      <div className="relative flex items-center gap-x-3">
        <span
          className={cn({
            "text-white": swapOrigin === SwapOrigin.EXCHANGE,
            "text-gray-500": swapOrigin === SwapOrigin.APP,
          })}
        >
          Exchange
        </span>
        <input
          type="checkbox"
          className="toggle toggle-sm"
          checked={swapOrigin === SwapOrigin.APP}
          onChange={toggleSwapOrigin}
        />
        <span
          className={cn({
            "text-gray-500": swapOrigin === SwapOrigin.EXCHANGE,
            "text-white": swapOrigin === SwapOrigin.APP,
          })}
        >
          App
        </span>
        <div
          className="absolute cursor-pointer -top-2 -right-6 tooltip"
          data-tip={tooltipMessage}
        >
          <svg
            className="w-4 h-4 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M11,7h2v2h-2V7z M11,11h2v6h-2V11z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20 c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
