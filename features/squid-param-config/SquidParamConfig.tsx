import React, { useCallback } from "react";
import Image from "next/legacy/image";

import { useSquidStateStore, useSwapStore, useWalletStore } from "store";

export const SquidParamConfig = () => {
  const {
    isSquidTrade,
    slippage,
    setSlippage,
    setEnableGMPExpress,
    enableGMPExpress,
  } = useSquidStateStore((state) => state);

  if (!isSquidTrade) return null;

  return (
    <div
      className=" dropdown tooltip tooltip-warning dropdown-end"
      data-tip={`Adjust Squid swap parameters`}
    >
      <label
        tabIndex={0}
        className="flex items-center btn btn-info btn-xs gap-x-2"
      >
        <Image
          loading="eager"
          src={"/assets/ui/adjustment-horizontal.logo.svg"}
          height={20}
          width={20}
          alt="swap_params"
        />
      </label>
      <ul
        tabIndex={0}
        className="p-1 rounded-lg shadow-lg dropdown-content menu"
        style={{ backgroundColor: "#16212e", border: "white" }}
      >
        <li>
          <div className="flex flex-row h-12 form-control">
            <label className="label">
              <span className="label-text">Slippage</span>
            </label>
            <label className="flex flex-row input-group input-group-xs">
              <input
                type="number"
                placeholder="1"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value as any)}
                className="w-12 h-6 p-5 m-5 input input-bordered"
              />
              <span>%</span>
            </label>
          </div>
        </li>
        <li>
          <div className="h-12 form-control">
            <label className="flex justify-between w-full cursor-pointer label">
              <span className="label-text">GMP Express (Coming soon!)</span>
              <div>
                <input
                  type="checkbox"
                  checked={enableGMPExpress}
                  disabled
                  className="h-6 checkbox"
                />
              </div>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};
