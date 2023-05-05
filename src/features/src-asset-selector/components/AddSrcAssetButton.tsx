import React, { useCallback } from "react";
import Image from "next/image";
import { pick } from "rambda";
import { useNetwork, useSwitchNetwork } from "wagmi";
import wait from "wait";

import { defaultAssetImg, defaultChainImg } from "~/config/constants";
import { getWagmiChains } from "~/config/web3";

import { useSwapStore, useWalletStore } from "~/store";

import { makeAccessibleKeysHandler } from "~/utils/react";
import { addAssetToMetamaskWithAssetConfig } from "~/utils/wallet/metamask";

export const AddSrcAssetButton = () => {
  const { wagmiConnected, wagmiConnectorId } = useWalletStore(
    pick(["wagmiConnected", "wagmiConnectorId"])
  );
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);

  const { switchNetworkAsync } = useSwitchNetwork();
  const network = useNetwork();

  const handleOnAddTokenOnSrcChain = useCallback(() => {
    if (!asset) {
      return;
    }

    const wagmiChains = getWagmiChains();
    const chainId = wagmiChains.find(
      (_chain) =>
        _chain.networkNameOverride === srcChain.chainName?.toLowerCase()
    )?.id;
    if (!chainId) {
      return;
    }

    if (network.chain?.id !== chainId) {
      // switch to chain
      switchNetworkAsync?.(chainId)
        .then(() => wait(500))
        .then(() => addAssetToMetamaskWithAssetConfig(asset, srcChain))
        .catch((error) => console.log(error));
    } else {
      addAssetToMetamaskWithAssetConfig(asset, srcChain);
    }

    // add token
  }, [srcChain, asset, switchNetworkAsync, network]);

  if (!wagmiConnected || wagmiConnectorId?.toLowerCase() !== "metamask") {
    return null;
  }
  if (srcChain.module !== "evm" && destChain.module !== "evm") {
    return null;
  }
  if (
    srcChain.module === "evm" &&
    asset?.is_gas_token &&
    destChain.module !== "evm"
  ) {
    return null;
  }

  return (
    <div
      className=" dropdown tooltip tooltip-warning dropdown-end"
      data-tip={`Add ${
        asset?.chain_aliases[srcChain.chainName.toLowerCase()]?.assetSymbol
      } to Metamask`}
    >
      <label
        tabIndex={0}
        className="flex items-center mr-2 btn btn-info btn-xs gap-x-2"
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
        {srcChain?.module === "evm" && !asset?.is_gas_token && (
          <li {...makeAccessibleKeysHandler(handleOnAddTokenOnSrcChain)}>
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
                alt={asset?.id || "asset"}
              />
              <Image
                height={20}
                width={20}
                src="/assets/ui/switch-arrow.svg"
                alt="switch-arrow"
              />
              <Image
                loading="eager"
                src={`/assets/chains/${srcChain.chainName?.toLowerCase()}.logo.svg`}
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
