import React from "react";

import { InputWrapper } from "~/components/common";

import { useSwapStore } from "~/store";

import { WalletFillBtn } from "../wallet-fill-btn";

export const AddressFiller = () => {
  const destAddress = useSwapStore((state) => state.destAddress);
  const setDestAddress = useSwapStore((state) => state.setDestAddress);

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
        <WalletFillBtn />
      </div>
    </div>
  );
};
