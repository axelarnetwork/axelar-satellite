import React, { useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";
import { pick } from "rambda";
import { useAccount, useConnect } from "wagmi";

import { getSrcChainId, useSwapStore, useWalletStore } from "~/store";

import { makeAccessibleKeysHandler } from "~/utils/react";

export const MetamaskFill = () => {
  const destChain = useSwapStore((state) => state.destChain);
  const wagmiSrcChainId = useSwapStore(getSrcChainId);

  const { connect, connectors } = useConnect({
    chainId: wagmiSrcChainId,
  });
  const { address } = useAccount();
  const { wagmiConnected, wagmiConnectorId } = useWalletStore(
    pick(["wagmiConnected", "wagmiConnectorId"])
  );

  const setDestAddress = useSwapStore((state) => state.setDestAddress);

  const handleOnClick = useCallback(() => {
    function connectMetamask() {
      const connector = connectors.find((c) => c.name === "MetaMask");
      connect({ connector });
    }
    if (!wagmiConnected) {
      return connectMetamask();
    }
    if (address) {
      setDestAddress(address);
    }
  }, [wagmiConnected, address, setDestAddress, connect, connectors]);

  if (destChain.module !== "evm") {
    return null;
  }

  return (
    <div
      className={clsx(
        "bg-gradient-to-b group h-full w-28 p-[1px] rounded-lg cursor-pointer animate__animated animate__pulse",
        {
          "from-[#E8821E] to-[#F89C35]":
            wagmiConnectorId === "metaMask" || !wagmiConnectorId,
          "from-[#0052FF] to-[#1062FF]": wagmiConnectorId === "coinbaseWallet",
        }
      )}
      {...makeAccessibleKeysHandler(handleOnClick)}
    >
      <div className="flex justify-around items-center h-full w-full bg-[#291e14] rounded-lg p-3">
        <div
          className={clsx(
            "text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-b",
            {
              "from-[#E8821E] to-[#F89C35]":
                wagmiConnectorId === "metaMask" || !wagmiConnectorId,
              "from-[#0052FF] to-[#1062FF]":
                wagmiConnectorId === "coinbaseWallet",
            }
          )}
        >
          {wagmiConnected ? "Fill with" : "Connect"}
        </div>

        <div className="relative flex items-center h-full ">
          <Image
            className="duration-200 group-hover:-translate-y-1"
            height={25}
            width={25}
            alt={wagmiConnectorId ?? "metamask"}
            src={`/assets/wallets/${
              wagmiConnectorId?.toLowerCase() ?? "metamask"
            }.logo.svg`}
          />
        </div>
      </div>
    </div>
  );
};
