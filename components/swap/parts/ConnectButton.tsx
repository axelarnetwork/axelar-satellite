import { useEffect, useState } from "react";
import Image from "next/image";

import { useWalletStore } from "../../../store";

import cn from "classnames";

import { useIsTerraConnected } from "../../../hooks/terra/useIsTerraConnected";
import { ConnectIndicator } from "../../common";

export const ConnectButton = () => {
  const { wagmiConnected, keplrConnected } = useWalletStore();
  const [anyWalletConnected, setAnyWalletConnected] = useState(false);
  const { isTerraConnected, isTerraInitializingOrConnected } =
    useIsTerraConnected();

  useEffect(() => {
    const anyActive = wagmiConnected || keplrConnected || isTerraConnected;
    setAnyWalletConnected(anyActive);
  }, [wagmiConnected, keplrConnected, isTerraConnected]);

  function renderConnectIndicator() {
    if (anyWalletConnected) return <ConnectIndicator />;
    return (
      <>
        <div className="relative">
          <Image
            src="/assets/ui/wallet.svg"
            height={16}
            width={16}
            alt="Wallet Icon"
          />
        </div>
        <span>Connect Wallet</span>
      </>
    );
  }

  return (
    <label
      className={cn("w-full btn border-0 bg-[#1b2836] shadow-lg")}
      htmlFor="web3-modal"
      data-testid="connect-button"
    >
      <div className="flex items-center gap-3 text-xs">
        {renderConnectIndicator()}
      </div>
    </label>
  );
};
