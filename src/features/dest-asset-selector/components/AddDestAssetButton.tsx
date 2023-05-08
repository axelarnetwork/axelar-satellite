import React, { useCallback } from "react";
import Image from "next/image";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";
import { pick } from "rambda";
import { useNetwork, useSwitchNetwork } from "wagmi";
import wait from "wait";

import {
  NATIVE_ASSET_IDS,
  defaultAssetImg,
  defaultChainImg,
} from "~/config/constants";
import { getWagmiChains } from "~/config/web3";

import { useSquidStateStore, useSwapStore, useWalletStore } from "~/store";

import { makeAccessibleKeysHandler } from "~/utils/react";
import {
  addAssetToMetamaskWithAssetConfig,
  addTokenToMetamaskWithAssetInfo,
} from "~/utils/wallet/metamask";

export const AddDestAssetButton = () => {
  const { wagmiConnected, wagmiConnectorId } = useWalletStore(
    pick(["wagmiConnected", "wagmiConnectorId"])
  );
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);
  const { isSquidTrade, selectedSquidAsset } = useSquidStateStore();

  const { switchNetworkAsync } = useSwitchNetwork();
  const network = useNetwork();

  const handleOnAddTokenOnDestChain = useCallback(() => {
    if (!asset) {
      return;
    }

    const wagmiChains = getWagmiChains();
    const chainId = wagmiChains.find(
      (_chain) =>
        _chain.networkNameOverride === destChain.chainName?.toLowerCase()
    )?.id;
    if (!chainId) {
      return;
    }

    if (network.chain?.id !== chainId) {
      // switch to chain
      switchNetworkAsync?.(chainId)
        .then(() => wait(500))
        .then(() => {
          isSquidTrade
            ? addTokenToMetamaskWithAssetInfo(selectedSquidAsset as AssetInfo)
            : addAssetToMetamaskWithAssetConfig(asset, destChain);
        })
        .catch((error) => console.log(error));
    } else {
      isSquidTrade
        ? addTokenToMetamaskWithAssetInfo(selectedSquidAsset as AssetInfo)
        : addAssetToMetamaskWithAssetConfig(asset, destChain);
    }

    // add token
  }, [
    destChain,
    asset,
    switchNetworkAsync,
    isSquidTrade,
    selectedSquidAsset,
    network,
  ]);

  if (!wagmiConnected || wagmiConnectorId?.toLowerCase() !== "metamask") {
    return null;
  }

  if (destChain.module !== "evm") {
    return null;
  }
  if (
    selectedSquidAsset &&
    NATIVE_ASSET_IDS.includes(
      selectedSquidAsset.assetSymbol?.toLowerCase() as string
    )
  ) {
    return null;
  }

  return (
    <div
      className="mb-2 dropdown tooltip tooltip-warning dropdown-end max-w-fit justify-self-end"
      data-tip={`Add ${
        selectedSquidAsset
          ? selectedSquidAsset.assetSymbol
          : asset?.chain_aliases[destChain.chainName.toLowerCase()]?.assetSymbol
      } to Metamask`}
    >
      <label
        tabIndex={0}
        className="flex items-center btn btn-info btn-xs gap-x-2"
      >
        <span className="font-normal" style={{ fontSize: 10 }}>
          Add Asset
        </span>
        <Image
          loading="eager"
          src="/assets/wallets/metamask.logo.svg"
          height={20}
          width={20}
          alt="metamask logo"
        />
      </label>
      <ul
        tabIndex={0}
        className="w-32 p-1 rounded-lg shadow-lg dropdown-content menu"
        style={{ backgroundColor: "#16212e" }}
      >
        {destChain?.module === "evm" && (
          <li {...makeAccessibleKeysHandler(handleOnAddTokenOnDestChain)}>
            <span>
              <Image
                loading="eager"
                src={`/assets/tokens/${asset?.id}.logo.svg`}
                width={20}
                height={20}
                onError={(e) => {
                  e.currentTarget.src = defaultAssetImg;
                  e.currentTarget.srcset = defaultAssetImg;
                }}
                alt="asset"
              />
              <Image
                height={20}
                width={20}
                src="/assets/ui/switch-arrow.svg"
                alt="switch-arrow"
              />
              <Image
                loading="eager"
                src={`/assets/chains/${destChain.chainName?.toLowerCase()}.logo.svg`}
                width={20}
                height={20}
                onError={(e) => {
                  e.currentTarget.src = defaultChainImg;
                  e.currentTarget.srcset = defaultChainImg;
                }}
                alt="chain"
              />
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};
