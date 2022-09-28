import Image from "next/image";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useWalletStore } from "../../../store";
import { ConnectIndicator } from "../../common";
import { useIsTerraConnected } from "../../../hooks/terra/useIsTerraConnected";

export const ConnectButton = () => {
  const { wagmiConnected, keplrConnected } = useWalletStore();
  const [anyWalletConnected, setAnyWalletConnected] = useState(false);
  const isTerraConnected = useIsTerraConnected();

  useEffect(() => {
    const isAnyActive = [wagmiConnected, keplrConnected, isTerraConnected].some(
      (isActive) => isActive
    );
    if (anyWalletConnected !== isAnyActive) setAnyWalletConnected(isAnyActive);
  }, [wagmiConnected, keplrConnected]);

  function renderConnectIndicator() {
    if (anyWalletConnected) return <ConnectIndicator />;
    return (
      <>
        <div className="relative">
          <Image src="/assets/ui/wallet.svg" height={16} width={16} />
        </div>
        <span>Connect Wallet</span>
      </>
    );
  }

  return (
    <label
      className={cn("w-full btn border-0 bg-[#1b2836] shadow-lg")}
      htmlFor="web3-modal"
    >
      <div className="flex items-center gap-3 text-xs">
        {renderConnectIndicator()}
      </div>
    </label>
  );
};
