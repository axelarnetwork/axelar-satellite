import React from "react";
import Image from "next/image";
import { useSwitchNetwork } from "wagmi";

import { getWagmiChains } from "~/config/web3";
import { useSwapStore } from "~/store";
import { addAssetToMetamask } from "~/utils/wallet/metamask";

import { BlockExplorerLink } from "./BlockExplorerLink";

export const TxSummaryStats = () => {
  const asset = useSwapStore((state) => state.asset);
  const destChain = useSwapStore((state) => state.destChain);
  const { switchNetwork } = useSwitchNetwork();

  return (
    <div className="flex flex-col justify-center h-full text-base text-md gap-y-1">
      <h2 className="text-lg font-bold text-center">Transfer complete!</h2>
      <div className="my-0 divider" />
      <BlockExplorerLink />
      {destChain.module === "evm" && (
        <div
          className="flex items-center justify-center hover:underline hover:cursor-pointer gap-x-2"
          onClick={() => {
            switchNetwork?.(
              getWagmiChains().find(
                (chain) =>
                  chain.networkNameOverride ===
                  destChain.chainName?.toLowerCase()
              )?.id
            );
          }}
        >
          <span
            className="font-light text-gray-200"
            onClick={() => asset && addAssetToMetamask(asset, destChain)}
          >
            Add token to Metamask ({destChain.chainName})
          </span>
          <Image
            src={"/assets/wallets/metamask.logo.svg"}
            height={16}
            width={16}
            alt="metamask"
          />
        </div>
      )}
    </div>
  );
};
