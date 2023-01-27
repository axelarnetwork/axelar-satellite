import React, { PropsWithChildren } from "react";

import { useSwapStore } from "~/store";

import cn from "classnames";

import { SwapStatus } from "../../utils/enums";

export const Blockable: React.FC<PropsWithChildren> = (props) => {
  const { swapStatus } = useSwapStore((state) => state);

  const isInactive = swapStatus !== SwapStatus.IDLE;

  return (
    <div
      className={cn({
        "cursor-not-allowed opacity-75": isInactive,
      })}
    >
      <div
        className={cn({
          "pointer-events-none": isInactive,
        })}
      >
        {props.children}
      </div>
    </div>
  );
};
