import React, { useMemo } from "react";

import { DestAssetSelector } from "features/dest-asset-selector";
import { DestChainSelector } from "features/dest-chain-selector";
import { GetAddressBtn } from "features/gen-address-btn";
import { SquidSwapBtn } from "features/squid-swap-btn";
import { AssetSelector } from "features/src-asset-selector";
import { SrcChainSelector } from "features/src-chain-selector";
import { SwapExecutionState } from "features/swap-states";

import {
  getSelectedAsssetIsWrapped,
  useSquidStateStore,
  useSwapStore,
} from "../../store";

import cn from "classnames";

import { ENVIRONMENT as env } from "../../config/constants";
import {
  useDetectDepositConfirmation,
  usePreventDuplicateChains,
  useRestrictAssets,
} from "../../hooks";
import { Blockable } from "../common";
import { EvmAssetWarningModal, ModalWindow } from "../modal";
import { ChainSwapper, StopButton } from "./parts";
import { TopFlows } from "./parts/TopFlows";

export const SwapBox = () => {
  usePreventDuplicateChains();
  useDetectDepositConfirmation();
  useRestrictAssets();

  const { destChain, asset, srcChain } = useSwapStore((state) => state);
  const selectedAssetIsWrapped = useSwapStore(getSelectedAsssetIsWrapped);
  const squidChains = useSquidStateStore((state) => state.squidChains);
  const isSquidAsset = useSquidStateStore((state) => state.isSquidTrade);

  const squidAssets = useMemo(() => {
    const destChainName = destChain.chainName.toLowerCase();
    return destChain.assets
      .filter((assetInfo) => assetInfo.isSquidAsset)
      .filter(
        (assetInfo) =>
          assetInfo.tokenAddress?.toLowerCase() !==
          asset?.chain_aliases[destChainName].tokenAddress.toLowerCase()
      );
  }, [asset?.chain_aliases, destChain.assets, destChain.chainName]);

  return (
    <div className="bg-base-100 rounded-xl w-full max-w-[550px] min-h-[500px] h-auto z-10">
      <ModalWindow />
      <EvmAssetWarningModal />
      <div className="flex flex-col h-full p-8 space-y-5 min-h-[500px]">
        <div
          className={cn("relative flex mb-0 space-x-8", {
            "justify-end": env === "mainnet",
            "justify-between": env === "testnet",
          })}
        >
          {env !== "mainnet" && (
            <div
              className={`font-bold text-white bg-red-500 border-0 badge badge-primary`}
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
        {isSquidAsset ? <SquidSwapBtn /> : <GetAddressBtn />}
      </div>
    </div>
  );
};
