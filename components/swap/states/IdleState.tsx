import React from "react";
import { useSwapStore } from "../../../store";
import { InputWrapper } from "../../common";
import { AddressFiller, InitialStats } from "../parts";

export const IdleState = () => {
  const { destAddress, setDestAddress } = useSwapStore((state) => state);

  function renderAddressFiller() {
    return (
      <div className="flex h-10 gap-2 ">
        <InputWrapper className="h-full">
          <div className="h-full">
            <input
              className="w-full h-full text-xs bg-transparent outline-none"
              placeholder="Destination address"
              value={destAddress}
              onChange={(e) => setDestAddress(e.target.value)}
            />
          </div>
        </InputWrapper>
        <div className="h-full">
          <AddressFiller />
        </div>
      </div>
    );
  }

  return (
    <>
      <InitialStats />
      {renderAddressFiller()}
    </>
  );
};
