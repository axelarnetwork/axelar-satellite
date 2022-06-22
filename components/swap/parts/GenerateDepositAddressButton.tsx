import React from "react";

export const GenerateDepositAddressButton = () => {
  return (
    <div className="w-full btn btn-primary">
      <div className="flex items-center gap-3">
        {/* <div className="relative">
          <Image src="/assets/ui/wallet.svg" height={20} width={20} />
        </div> */}
        <span>Generate Deposit Address</span>
      </div>
    </div>
  );
};
