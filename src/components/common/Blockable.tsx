import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { useSwapStore } from "~/store";

import { SwapStatus } from "~/utils/enums";

export const Blockable: React.FC<PropsWithChildren> = (props) => {
  const { swapStatus } = useSwapStore((state) => state);

  const isInactive = swapStatus !== SwapStatus.IDLE;

  return (
    <div
      className={clsx({
        "cursor-not-allowed opacity-75": isInactive,
      })}
    >
      <div
        className={clsx({
          "pointer-events-none": isInactive,
        })}
      >
        {props.children}
      </div>
    </div>
  );
};
