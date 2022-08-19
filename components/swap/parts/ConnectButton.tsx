import Image from "next/image";
import { useEffect, useState } from "react";
import { useWalletStore } from "../../../store";
import { ConnectIndicator } from "../../common";

export const ConnectButton = () => {
  const { wagmiConnected, keplrConnected } = useWalletStore();
  const [anyWalletConnected, setAnyWalletConnected] = useState(false);

  useEffect(() => {
    const isAnyActive = [wagmiConnected, keplrConnected].some(isActive => isActive);
    if (anyWalletConnected !== isAnyActive)
      setAnyWalletConnected(isAnyActive)
  }, [wagmiConnected, keplrConnected]);

  return (
    <label htmlFor="web3-modal" className={`w-full btn ${anyWalletConnected ? "btn-ghost btn-outline" : "btn-primary"}`}>
      <div className="flex items-center gap-3">
        {anyWalletConnected ? (
          <ConnectIndicator />
        ) : (
          <>
            <div className="relative">
              <Image src="/assets/ui/wallet.svg" height={16} width={16} />
            </div>
            <span>Connect Wallets</span>
          </>
        )}
      </div>
    </label>
  );
};
