import React from "react";
import Image from "next/image";

import { AssetInfo, ChainInfo } from "@axelar-network/axelarjs-sdk";

import {
  getTransferType,
  useSquidStateStore,
  useSwapStore,
} from "../../../store";

import { useSwitchNetwork } from "wagmi";
import { getWagmiChains } from "../../../config/web3";
import { InputWrapper } from "../../common";
import { TransferSwapStats } from "../parts";
import { ProgressBar } from "./parts";

export const addTokenToMetamask = async (
  asset: AssetInfo,
  chain: ChainInfo
) => {
  try {
    const {
      common_key,
      decimals,
      tokenAddress: address,
      assetName,
      assetSymbol,
    } = asset;

    return await (window as any).ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address,
          symbol: common_key === "uaxl" ? assetName : assetSymbol,
          decimals,
          image: assetSymbol
            ? `https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/${assetSymbol?.toLowerCase()}.png`
            : "",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const SquidFinished = () => {
  const { destAddress, txInfo, destChain } = useSwapStore();
  const transferType = useSwapStore(getTransferType);
  const statusResponse = useSquidStateStore((state) => state.statusResponse);
  const selectedSquidAsset = useSquidStateStore(
    (state) => state.selectedSquidAsset
  );
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork({
      onSuccess(data) {
        console.log("Success", data);
        setTimeout(
          () => addTokenToMetamask(selectedSquidAsset as AssetInfo, destChain),
          2000
        );
      },
    });

  function renderTxConfirmationInfo() {
    return (
      <div className="flex flex-col justify-center h-full text-base text-md gap-y-1">
        <h2 className="text-lg font-bold text-center">Swap Complete!</h2>
        <div className="my-0 divider" />
        <div>
          <a
            className="flex items-center text-primary hover:underline gap-x-2"
            href={statusResponse?.axelarTransactionUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>{`Visit Axelarscan for more information`}</span>
            <Image src={"/assets/ui/link.svg"} height={16} width={16} />
          </a>
        </div>
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
            <span className="font-light text-gray-200">
              Add token to Metamask ({destChain.chainName})
            </span>
            <Image
              src={"/assets/wallets/metamask.logo.svg"}
              height={16}
              width={16}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <TransferSwapStats />
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="relative flex flex-col h-full">
              <ProgressBar level={4} numSteps={4} />
              <div className="flex items-center justify-center h-full py-4 mt-auto text-xs gap-x-2">
                {renderTxConfirmationInfo()}
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
