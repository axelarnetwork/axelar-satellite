import React, { useCallback } from "react";
import { getSrcChainId, useSwapStore, useWalletStore } from "store";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";

export const MetamaskFill = () => {
  const destChain = useSwapStore((state) => state.destChain);
  const wagmiSrcChainId = useSwapStore(getSrcChainId);

  const { connect, connectors } = useConnect({
    chainId: wagmiSrcChainId,
  });
  const { address } = useAccount();
  const wagmiConnected = useWalletStore((state) => state.wagmiConnected);

  const setDestAddress = useSwapStore((state) => state.setDestAddress);

  const handleOnClick = useCallback(() => {
    function connectMetamask() {
      const connector = connectors.find((c) => c.name === "MetaMask");
      connect({ connector });
    }
    if (!wagmiConnected) return connectMetamask();
    if (address) setDestAddress(address);
  }, [wagmiConnected, address, setDestAddress, connect, connectors]);

  if (destChain.module !== "evm") return null;

  return (
    <div
      className="bg-gradient-to-b group from-[#E8821E] to-[#F89C35] h-full w-28 p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse"
      onClick={handleOnClick}
    >
      <div className="flex justify-around items-center h-full w-full bg-[#291e14] rounded-lg p-3">
        <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#E8821E] to-[#F89C35]">
          {wagmiConnected ? "Fill with" : "Connect"}
        </div>

        <div className="relative flex items-center h-full ">
          <Image
            className="duration-200 group-hover:-translate-y-1"
            height={25}
            width={25}
            src="/assets/wallets/metamask.logo.svg"
            alt="metamask"
          />
        </div>
      </div>
    </div>
  );
};
