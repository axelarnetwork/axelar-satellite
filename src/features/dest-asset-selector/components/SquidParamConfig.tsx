import React from "react";
import Image from "next/image";

import { useSquidStateStore } from "~/store";

export const SquidParamConfig = () => {
  const { isSquidTrade, slippage, setSlippage } = useSquidStateStore(
    (state) => state
  );

  if (!isSquidTrade) {
    return null;
  }

  return (
    <div
      className="ml-2 dropdown tooltip tooltip-warning dropdown-end"
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
                type="number"
                placeholder="1"
                step={0.01}
                value={slippage}
                onChange={(e) => setSlippage(Number(e.target.value))}
                className="w-16 input input-sm input-bordered"
              />
            </div>
            <span>%</span>
          </div>
        </li>
        {/* <li>
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
        </li> */}
      </ul>
    </div>
  );
};
