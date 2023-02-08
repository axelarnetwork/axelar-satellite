import React, { useCallback } from "react";
import Image from "next/legacy/image";

import { useSquidStateStore, useSwapStore, useWalletStore } from "~/store";

export const SquidParamConfig = () => {
  const {
    isSquidTrade,
    slippage,
    setSlippage,
    setEnableGMPExpress,
    enableGMPExpress,
  } = useSquidStateStore((state) => state);

  if (!isSquidTrade) {
    return null;
  }

  return (
    <div
      className="dropdown tooltip tooltip-warning dropdown-end"
      data-tip={"Adjust Squid swap parameters"}
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
        className="p-4 space-y-4 rounded-lg shadow-lg dropdown-content"
        style={{ backgroundColor: "#16212e", border: "white" }}
      >
        <li>
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-5">
              <span>Slippage</span>
              <input
                type="text"
                placeholder="1"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value as any)}
                className="w-16 input input-sm input-bordered"
              />
            </div>
            <span>%</span>
          </div>
        </li>
        <li>
          <div className="flex items-center justify-between text-left gap-x-5">
            <div>
              <h5>GMP Express</h5>
              <p className="text-xs text-accent">(coming soong)</p>
            </div>
            <input
              type="checkbox"
              checked={enableGMPExpress}
              disabled={true}
              className="h-6 checkbox"
            />
          </div>
        </li>
        {/* <li>
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
        </li> */}
      </ul>
    </div>
  );
};
