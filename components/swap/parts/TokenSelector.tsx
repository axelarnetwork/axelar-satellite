import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";

import { useSwapStore, useWalletStore } from "../../../store";
import { ENVIRONMENT } from "../../../config/constants";
import { SwapOrigin } from "../../../utils/enums";
import { useGetAssetBalance } from "../../../hooks";
import { AssetConfig } from "@axelar-network/axelarjs-sdk";
import { Blockable } from "../../common";
import { useRouter } from "next/router";
import UseGatewayQuery from "../../../hooks/useGatewayQuery";
import { BigNumber, FixedNumber } from "ethers";

const defaultAssetImg = "/assets/tokens/default.logo.svg";

export const TokenSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    asset,
    selectableAssetList,
    setAsset,
    srcChain,
    swapOrigin,
    tokensToTransfer,
    setTokensToTransfer,
  } = useSwapStore((state) => state);
  const { wagmiConnected, keplrConnected } = useWalletStore();
  const max = UseGatewayQuery();

  const [searchAssetInput, setSearchAssetInput] = useState<string>();
  const [filteredAssets, setFilteredAssets] =
    useState<AssetConfig[]>(selectableAssetList);

  const { balance, setKeplrBalance } = useGetAssetBalance();
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || selectableAssetList.length === 0) return;
    if (asset) return;
    const assetDenom = router.query.asset_denom as string;
    const foundAsset = selectableAssetList.find(
      (asset) => asset.common_key[ENVIRONMENT] === assetDenom
    );

    // FIXME: weird behaviour
    if (!foundAsset) {
      const fallbackAsset = selectableAssetList[0];
      if (fallbackAsset) {
        setAsset(fallbackAsset);
        router.push({
          query: {
            ...router.query,
            asset_denom: fallbackAsset.common_key[ENVIRONMENT],
          },
        });
      }
    } else {
      setAsset(asset);
    }
  }, [router.query, selectableAssetList]);

  useEffect(() => {
    if (!searchAssetInput) return setFilteredAssets(selectableAssetList);

    const chains = selectableAssetList.filter((asset) =>
      asset.common_key[ENVIRONMENT].toLowerCase().includes(searchAssetInput)
    );
    setFilteredAssets(chains);
  }, [searchAssetInput]);

  // update filtered assets state on chain change
  useEffect(() => {
    setFilteredAssets(selectableAssetList);
  }, [selectableAssetList]);

  // update asset balance from useGetAssetBalance hook if srcChain or asset changes
  useEffect(() => {
    if (srcChain?.module === "axelarnet") setKeplrBalance();
  }, [asset, srcChain]);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    if (dropdownOpen) setFilteredAssets(selectableAssetList);
    setDropdownOpen(!dropdownOpen);
  }

  function handleOnAssetChange(asset: AssetConfig) {
    setAsset(asset);
    router.push({
      query: {
        ...router.query,
        asset_denom: asset.common_key[ENVIRONMENT],
      },
    });
  }

  function handleOnMaxButtonClick() {
    if (max && +max - +balance < 0) setTokensToTransfer(balance);
    if (Number(balance)) setTokensToTransfer(balance);
  }

  function renderTokenInput() {
    if (!srcChain) return null;
    return (
      <div className="w-2/4 text-end">
        <input
          className="w-full text-lg font-bold text-right bg-transparent outline-none"
          type="number"
          value={tokensToTransfer}
          placeholder="0"
          onChange={(e) => setTokensToTransfer(e.target.value)}
        />
        {balance && (!!wagmiConnected || !!keplrConnected) ? (
          <div className="space-x-2">
            <span className="text-xs text-gray-500">Available</span>
            <span className="w-auto text-xs text-[#86d6ff]">{balance}</span>
          </div>
        ) : (
          <div className="h-6 space-x-2"></div>
        )}
      </div>
    );
  }

  function renderAssetDropdown() {
    if (!dropdownOpen || !srcChain) return null;

    return (
      <div className="p-2 rounded-lg shadow dropdown-content menu bg-[#02141b] left-0 w-full h-64 overflow-auto">
        <div className="px-2 py-2 ">
          <input
            className="w-full bg-[#333c42] input input-sm"
            placeholder="Search token"
            onChange={(e) => setSearchAssetInput(e.target.value)}
          />
        </div>
        <ul tabIndex={0} onClick={handleOnDropdownToggle}>
          {filteredAssets.map((asset) => {
            return (
              <li key={asset.common_key[ENVIRONMENT]}>
                <button onClick={() => handleOnAssetChange(asset)}>
                  <Image
                    src={`/assets/tokens/${asset.common_key[
                      ENVIRONMENT
                    ].toLowerCase()}.logo.svg`}
                    layout="intrinsic"
                    width={35}
                    height={35}
                    onError={(e) => {
                      e.currentTarget.src = defaultAssetImg;
                      e.currentTarget.srcset = defaultAssetImg;
                    }}
                  />
                  <span>
                    {
                      asset.chain_aliases[srcChain.chainName.toLowerCase()]
                        ?.assetName
                    }
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  function renderAssetName() {
    if (!asset || !srcChain) return "Select an asset";
    return asset.chain_aliases[srcChain.chainName.toLowerCase()]?.assetName;
  }

  return asset ? (
    <div ref={ref}>
      <div className="flex items-center justify-between h-6">
        <label className="block text-xs">I want to transfer</label>
        <div>
          {swapOrigin === SwapOrigin.APP && (
            <button
              className="btn btn-info btn-xs"
              onClick={handleOnMaxButtonClick}
            >
              Max
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <Blockable>
          <div className="static flex mt-1 dropdown dropdown-open">
            <div tabIndex={0} onClick={() => setDropdownOpen(true)}>
              <div className="flex items-center space-x-2 text-lg font-medium cursor-pointer">
                <Image
                  src={`/assets/tokens/${asset?.common_key[ENVIRONMENT]}.logo.svg`}
                  layout="intrinsic"
                  width={35}
                  height={35}
                  onError={(e) => {
                    e.currentTarget.src = defaultAssetImg;
                    e.currentTarget.srcset = defaultAssetImg;
                  }}
                />
                <span>{renderAssetName()}</span>
                <div className="flex items-center">
                  <Image
                    src="/assets/ui/arrow-down.svg"
                    layout="intrinsic"
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            </div>

            {renderAssetDropdown()}
          </div>
        </Blockable>
        {swapOrigin === SwapOrigin.APP && renderTokenInput()}
      </div>
    </div>
  ) : null;
};
