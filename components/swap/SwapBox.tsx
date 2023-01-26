import React from "react";

import { AssetSelector } from "features/asset-selector";
import { DestChainSelector } from "features/dest-chain-selector";
import { GetAddressBtn } from "features/gen-address-btn";
import { SrcChainSelector } from "features/src-chain-selector";

import cn from "classnames";

import { ENVIRONMENT as env } from "../../config/constants";
import {
  useDetectDepositConfirmation,
  usePreventDuplicateChains,
  useRestrictAssets,
} from "../../hooks";
import { Blockable } from "../common";
import { EvmAssetWarningModal, ModalWindow } from "../modal";
import { ChainSwapper, StopButton, SwapStates } from "./parts";
import { DestinationTokenSelector } from "./parts/DestinationTokenSelector";
import { TopFlows } from "./parts/TopFlows";

export const SwapBox = () => {
  usePreventDuplicateChains();
  useDetectDepositConfirmation();
  useRestrictAssets();

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
        <DestinationTokenSelector />
        <SwapStates />
        <GetAddressBtn />
      </div>
    </div>
  );
};
