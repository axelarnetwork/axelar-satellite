import React from "react";
import Image from "next/image";
import { useSwitchNetwork } from "wagmi";

import { getWagmiChains } from "~/config/web3";

import { useSwapStore, useWalletStore } from "~/store";

import { addAssetToMetamaskWithAssetConfig } from "~/utils/wallet/metamask";

import { BlockExplorerLink } from "./BlockExplorerLink";

export const TxSummaryStats = () => {
  const asset = useSwapStore((state) => state.asset);
  const shouldUnwrapAsset = useSwapStore((state) => state.shouldUnwrapAsset);
  const destChain = useSwapStore((state) => state.destChain);
  const { switchNetwork } = useSwitchNetwork();
  const wagmiConnectorId = useWalletStore((state) => state.wagmiConnectorId);

  return (
    <div className="flex flex-col justify-center h-full text-base text-md gap-y-1">
      <h2 className="text-lg font-bold text-center">Transfer complete!</h2>
      <div className="my-0 divider" />
      <BlockExplorerLink />
      {destChain.module === "evm" && !shouldUnwrapAsset && (
        <div className="flex items-center justify-center hover:underline hover:cursor-pointer gap-x-2">
          {wagmiConnectorId === "metaMask" && (
            <>
              <button
                className="font-light text-gray-200"
                onClick={() =>
                  asset && addAssetToMetamaskWithAssetConfig(asset, destChain)
                }
              >
                Add token to Metamask ({destChain.chainName})
              </button>
              <button
                onClick={() => {
                  const targetNetwork = getWagmiChains().find(
                    (chain) =>
                      chain.networkNameOverride ===
                      destChain.chainName?.toLowerCase()
                  );

                  switchNetwork?.(targetNetwork?.id);
                }}
                className="tooltip"
                data-tip={`Switch to this network in ${wagmiConnectorId}`}
                aria-label={`Switch to this network in ${wagmiConnectorId}`}
              >
                <Image
                  src={`/assets/wallets/${wagmiConnectorId?.toLowerCase()}.logo.svg`}
                  height={16}
                  width={16}
                  alt={wagmiConnectorId}
                />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
