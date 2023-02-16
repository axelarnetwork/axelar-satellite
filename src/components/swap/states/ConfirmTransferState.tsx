import React, { useEffect } from "react";
import Image from "next/legacy/image";
import { AssetConfig, ChainInfo } from "@axelar-network/axelarjs-sdk";
import { useSwitchNetwork } from "wagmi";

import { AXELARSCAN_URL, ENVIRONMENT } from "~/config/constants";
import { getCosmosChains, getWagmiChains } from "~/config/web3";
import { InputWrapper } from "~/components/common";
import { logEvent } from "~/components/scripts";

import { getTransferType, useSwapStore } from "~/store";

import { makeAccessibleKeysHandler } from "~/utils/react";

import { TransferStats } from "../parts";
import { ProgressBar } from "./parts";

export const addTokenToMetamask = async (
  asset: AssetConfig,
  chain: ChainInfo
) => {
  try {
    const { common_key, decimals, native_chain, chain_aliases } = asset;
    const {
      tokenAddress: address,
      assetSymbol: symbol,
      assetName,
    } = chain_aliases[chain.chainName?.toLowerCase()];
    const nativeAssetSymbol = chain_aliases[native_chain].assetSymbol;

    return await window.ethereum?.request({
      // @ts-ignore
      method: "wallet_watchAsset",
      params: {
        // @ts-ignore
        type: "ERC20",
        options: {
          address: String(address),
          symbol: common_key[ENVIRONMENT] === "uaxl" ? assetName : symbol,
          decimals,
          image: nativeAssetSymbol
            ? `https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/${nativeAssetSymbol?.toLowerCase()}.png`
            : "",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const ConfirmTransferState = () => {
  const { destAddress, txInfo, asset, destChain } = useSwapStore();
  const transferType = useSwapStore(getTransferType);
  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      console.log("Success", data);
      setTimeout(
        () => addTokenToMetamask(asset as AssetConfig, destChain),
        2000
      );
    },
  });

  useEffect(() => {
    logEvent("transfer_complete");
  }, []);

  useEffect(() => {
    logEvent("transfer_complete");
  }, []);

  function renderTxConfirmationInfo() {
    const links = {
      href: "",
      text: "",
    };
    if (transferType === "deposit-address") {
      links.href = `${AXELARSCAN_URL}/transfer/${txInfo.sourceTxHash}`;
      links.text = "Visit Axelarscan for more information";
    } else {
      let blockScannerName;
      if (destChain.module === "evm") {
        const evmRpc = getWagmiChains().find(
          (network) =>
            network.networkNameOverride === destChain.chainName.toLowerCase()
        )?.blockExplorers?.default;
        const { name, url } = evmRpc as { name: string; url: string };
        blockScannerName = name;
        links.href = `${url}address/${destAddress}`;
      } else {
        const chain = getCosmosChains([]).find(
          (_chain) =>
            _chain.chainIdentifier === destChain.chainName?.toLowerCase()
        );
        blockScannerName = destChain.chainName;
        links.href = `${chain?.explorer}${destAddress}` || "";
      }

      links.text = `See your account balance on ${blockScannerName}`;
    }
    return (
      <div className="flex flex-col justify-center h-full text-base text-md gap-y-1">
        <h2 className="text-lg font-bold text-center">Transfer complete!</h2>
        <div className="my-0 divider" />
        <div>
          <a
            className="flex items-center text-primary hover:underline gap-x-2"
            href={links.href}
            target="_blank"
            rel="noreferrer"
          >
            <span>{links.text}</span>
            <Image
              src={"/assets/ui/link.svg"}
              height={16}
              width={16}
              alt="link"
            />
          </a>
        </div>
        {destChain.module === "evm" && (
          <div
            className="flex items-center justify-center hover:underline hover:cursor-pointer gap-x-2"
            {...makeAccessibleKeysHandler(() => {
              switchNetwork?.(
                getWagmiChains().find(
                  (chain) =>
                    chain.networkNameOverride ===
                    destChain.chainName?.toLowerCase()
                )?.id
              );
            })}
          >
            <span className="font-light text-gray-200">
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
  }

  return (
    <>
      <TransferStats />
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="relative flex flex-col h-full">
              <ProgressBar level={3} />
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
