import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { useWalletStore } from "~/store";

import { useIsTerraConnected } from "~/hooks/terra/useIsTerraConnected";

import { ConnectIndicator } from "../../common";

export const ConnectButton = () => {
  const { wagmiConnected, keplrConnected } = useWalletStore();
  const [anyWalletConnected, setAnyWalletConnected] = useState(false);
  const { isTerraConnected } = useIsTerraConnected();

  useEffect(() => {
    const anyActive = wagmiConnected || keplrConnected || isTerraConnected;
    setAnyWalletConnected(anyActive);
  }, [wagmiConnected, keplrConnected, isTerraConnected]);

  function renderConnectIndicator() {
    if (anyWalletConnected) {
      return <ConnectIndicator />;
    }
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
    <label htmlFor="web3-modal" data-testid="connect-button">
      <div
        role="button"
        className={clsx(
          "bg-[#1b2836] shadow-lg flex items-center gap-3 text-xs p-2 px-4 rounded-lg",
          "hover:opacity-75 transition-opacity",
          "absolute top-2 right-2 z-10 md:relative"
        )}
      >
        {renderConnectIndicator()}
      </div>
    </label>
  );
};
