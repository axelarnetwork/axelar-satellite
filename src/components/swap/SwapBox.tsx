import { useMemo } from "react";
import clsx from "clsx";
import { identity, pick } from "rambda";

import { ENVIRONMENT as env } from "~/config/constants";
import { Blockable } from "~/components/common";
import { EvmAssetWarningModal, ModalWindow } from "~/components/modal";

import { DestAssetSelector } from "~/features/dest-asset-selector";
import { DestChainSelector } from "~/features/dest-chain-selector";
import { GetAddressBtn } from "~/features/gen-address-btn";
import { SquidSwapBtn } from "~/features/squid-swap-btn";
import { AssetSelector } from "~/features/src-asset-selector";
import { SrcChainSelector } from "~/features/src-chain-selector";
import { SwapExecutionState } from "~/features/swap-states";

import { useSquidStateStore, useSwapStore } from "~/store";

import {
  useDetectDepositConfirmation,
  usePreventDuplicateChains,
  useRestrictAssets,
} from "~/hooks";

import { ChainSwapper, StopButton } from "./parts";
import { TopFlows } from "./parts/TopFlows";

export const SwapBox = () => {
  usePreventDuplicateChains();
  useDetectDepositConfirmation();
  useRestrictAssets();

  const { destChain, srcChain, allAssets } = useSwapStore(identity);
  const { isSquidTrade } = useSquidStateStore(pick(["isSquidTrade"]));

  const destChainName = destChain.chainName.toLowerCase();

  const squidAssets = useMemo(() => {
    return allAssets.filter(
      (asset) =>
        (asset.isSquidAsset || asset.isSquidOnlyAsset) &&
        destChainName in asset.chain_aliases
    );
  }, [allAssets, destChainName]);

  return (
    <div className="bg-base-100 md:rounded-xl w-screen sm:w-full md:max-w-[550px] min-h-[500px] h-auto z-10">
      <ModalWindow />
      <EvmAssetWarningModal />
      <div className="flex flex-col h-full p-2 xs:p-4 sm:p-6 md:p-8 space-y-5 min-h-[500px]">
        <div
          className={clsx("relative flex mb-0 space-x-8", {
            "justify-end": env === "mainnet",
            "justify-between": env === "testnet",
          })}
        >
          {env !== "mainnet" && (
            <div
              className={
                "font-bold text-white bg-red-500 border-0 badge badge-primary"
              }
            >
              {env.toUpperCase()}
            </div>
          )}
          <div className="flex">
            <StopButton />
            <Blockable>
              <TopFlows />
            </Blockable>
          </div>
        </div>

        <Blockable>
          <div className="flex">
            <SrcChainSelector />
            <ChainSwapper />
            <DestChainSelector />
          </div>
        </Blockable>

        <AssetSelector />

        <DestAssetSelector
          squidAssets={srcChain?.module === "evm" ? squidAssets : []}
        />
        <SwapExecutionState />
        {isSquidTrade ? <SquidSwapBtn /> : <GetAddressBtn />}
      </div>
    </div>
  );
};
