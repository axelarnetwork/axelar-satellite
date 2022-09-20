import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";

import {
  getSelectedAssetSymbol,
  useSwapStore,
  useWalletStore,
} from "../../../store";
import { ENVIRONMENT } from "../../../config/constants";
import { SwapOrigin } from "../../../utils/enums";
import { useGetAssetBalance, useGetMaxTransferAmount } from "../../../hooks";
import { AssetConfig } from "@axelar-network/axelarjs-sdk";
import { Blockable } from "../../common";
import { useRouter } from "next/router";
import { renderGasFee } from "../../../utils/renderGasFee";
import BigNumber from "bignumber.js";
import { SpinnerDotted } from "spinners-react";
import {
  useWallet as useTerraWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { roundNumberTo } from "../../../utils/roundNumberTo";
import { connectToKeplr } from "../../web3/utils/handleOnKeplrConnect";

const defaultAssetImg = "/assets/tokens/default.logo.svg";

export const TokenSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    asset,
    allAssets,
    selectableAssetList,
    setAsset,
    srcChain,
    destChain,
    swapOrigin,
    tokensToTransfer,
    setTokensToTransfer,
  } = useSwapStore((state) => state);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);
  const { wagmiConnected, keplrConnected, userSelectionForCosmosWallet, setKeplrConnected, setUserSelectionForCosmosWallet } =
    useWalletStore();
  const max = useGetMaxTransferAmount();
  const { status: TerraWalletStatus, connect: connectTerraWallet } = useTerraWallet();
  const [showBalance, setShowBalance] = useState(false);

  const [searchAssetInput, setSearchAssetInput] = useState<string>();
  const [filteredAssets, setFilteredAssets] =
    useState<AssetConfig[]>(selectableAssetList);

  const { balance, setKeplrBalance, loading, terraStationBalance } =
    useGetAssetBalance();
  const [balanceToShow, setBalanceToShow] = useState("0");
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setTokensToTransfer("0");
  }, [userSelectionForCosmosWallet]);


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
        // router.push({
        //   query: {
        //     ...router.query,
        //     asset_denom: fallbackAsset.common_key[ENVIRONMENT],
        //   },
        // });
      }
    } else {
      setAsset(asset);
    }
  }, [router.query, selectableAssetList]);

  useEffect(() => {
    const isEVM = !!(srcChain?.module === "evm" && wagmiConnected);
    const isAxelarnet = !!(srcChain?.module === "axelarnet" && keplrConnected);
    const isTerra =
      srcChain?.chainName.toLowerCase() === "terra" &&
      TerraWalletStatus === WalletStatus.WALLET_CONNECTED &&
      userSelectionForCosmosWallet === "terraStation";

    const shouldshowBalance = isEVM || isAxelarnet || isTerra;
    setShowBalance(shouldshowBalance);

    if (!shouldshowBalance) return;

    if (isEVM) setBalanceToShow(balance);
    else if (isTerra) setBalanceToShow(terraStationBalance as string);
    else if (isAxelarnet) setBalanceToShow(balance);
  }, [
    srcChain,
    balance,
    wagmiConnected,
    TerraWalletStatus,
    keplrConnected,
    terraStationBalance,
    userSelectionForCosmosWallet,
  ]);

  useEffect(() => {
    if (!searchAssetInput) return setFilteredAssets(selectableAssetList);

    const chains = selectableAssetList.filter((asset) =>
      asset.common_key[ENVIRONMENT].toLowerCase().includes(searchAssetInput)
    );
    setFilteredAssets(chains);
  }, [searchAssetInput]);

  useEffect(() => {
    if (!asset) return;
    // router.push({
    //   query: {
    //     ...router.query,
    //     asset_denom: asset.common_key[ENVIRONMENT],
    //   },
    // });
  }, [asset]);

  // update filtered assets state on chain change
  useEffect(() => {
    setFilteredAssets(selectableAssetList);
  }, [selectableAssetList]);

  // update asset balance from useGetAssetBalance hook if srcChain or asset changes
  useEffect(() => {
    if (srcChain?.module === "axelarnet" && keplrConnected) setKeplrBalance();
  }, [asset, srcChain, keplrConnected]);

  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    if (dropdownOpen) setFilteredAssets(selectableAssetList);
    setDropdownOpen(!dropdownOpen);
  }

  async function handleOnAssetChange(asset: AssetConfig) {
    // await router.push({
    //   query: {
    //     ...router.query,
    //     asset_denom: asset.common_key[ENVIRONMENT],
    //   },
    // });
    setAsset(asset);
  }

  function handleOnMaxButtonClick() {
    const bal = balanceToShow;
    if (max && +max !== 0 && +bal > +max) setTokensToTransfer(max);
    else if (Number(bal)) setTokensToTransfer(bal);
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
        {balance && showBalance ? (
          <>
            {" "}
            <div className="flex flex-row justify-end space-x-1">
              <span className="text-xs text-gray-500">
                Available{" "}
                {srcChain.chainName.toLowerCase() === "terra" && (
                  <span className="text-xs text-gray-500">
                    {userSelectionForCosmosWallet === "terraStation"
                      ? "(Terra Station)"
                      : "(Keplr)"}
                  </span>
                )}
              </span>
              <span className="w-auto text-xs text-[#86d6ff]">
                {loading ? (
                  <SpinnerDotted
                    className="text-blue-500"
                    size={15}
                    color="#00a6ff"
                  />
                ) : (
                  roundNumberTo(balanceToShow, 1)
                )}
              </span>
            </div>
            {srcChain.module === "axelarnet" &&
            srcChain.chainName.toLowerCase() === "terra" ? (
              TerraWalletStatus === WalletStatus.WALLET_CONNECTED &&
              userSelectionForCosmosWallet === "terraStation" &&
              terraStationBalance ? (
                <span
                  className="h-6 text-xs text-gray-500 cursor-pointer hover:underline"
                  onClick={async () => {
                    await connectToKeplr(allAssets);
                    setKeplrConnected(true);
                    setUserSelectionForCosmosWallet("keplr");
                  }}
                >
                  <span className="mr-1 text-xs text-gray-500">Switch to Keplr</span>
                  <Image
                    src={`/assets/ui/forward-arrow-link.svg`}
                    layout="intrinsic"
                    width={10}
                    height={10}
                  />
                </span>
              ) : (
                <span
                  className="h-6 text-xs text-gray-500 cursor-pointer hover:underline"
                  onClick={async () => {
                    if (TerraWalletStatus !== WalletStatus.WALLET_CONNECTED) await connectTerraWallet();
                    setUserSelectionForCosmosWallet("terraStation");
                  }}
                >
                  <span className="mr-1 text-xs text-gray-500">Switch to Terra Station</span>
                  <Image
                    src={`/assets/ui/forward-arrow-link.svg`}
                    layout="intrinsic"
                    width={10}
                    height={10}
                  />
                </span>
              )
            ) : null}
          </>
        ) : (
          <label
            htmlFor="web3-modal"
            className="h-6 space-x-2 text-xs text-gray-500 cursor-pointer hover:underline"
          >
            Connect{" "}
            {srcChain.module === "axelarnet"
              ? srcChain.chainName.toLowerCase() === "terra"
                ? "Terra Station or Keplr"
                : "Keplr"
              : "Metamask"}{" "}
            to see balance
          </label>
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
                        ?.assetSymbol
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
                <span>{selectedAssetSymbol}</span>
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
        {renderTokenInput()}
      </div>
    </div>
  ) : null;
};
