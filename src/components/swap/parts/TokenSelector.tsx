import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useWallet as useTerraWallet } from "@terra-money/wallet-provider";
import { SpinnerDotted } from "spinners-react";
import { useOnClickOutside } from "usehooks-ts";
import { useSwitchNetwork } from "wagmi";

import { ENVIRONMENT } from "~/config/constants";
import { getWagmiChains } from "~/config/web3";

import AssetIcon from "~/features/dest-asset-selector/components/AssetIcon";

import { getSelectedAssetName, useSwapStore, useWalletStore } from "~/store";

import { useGetAssetBalance, useGetMaxTransferAmount } from "~/hooks";
import { useConnectTerraStation } from "~/hooks/terra/useConnectTerraStation";
import { useIsTerraConnected } from "~/hooks/terra/useIsTerraConnected";
import { AssetConfigExtended } from "~/types";
import { makeAccessibleKeysHandler } from "~/utils/react";
import { roundNumberTo } from "~/utils/roundNumberTo";

import { MaxButton } from "../../../features/max-button";
import { Blockable } from "../../common";
import { connectToKeplr } from "../../web3/utils/handleOnKeplrConnect";
import { addTokenToMetamask } from "../states";
import { Arrow } from "./TopFlows";

const defaultChainImg = "/assets/chains/default.logo.svg";

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
    tokensToTransfer,
    setTokensToTransfer,
  } = useSwapStore((state) => state);
  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      console.log("Success", data);
      //@ts-ignore
      const newNetwork = data.networkNameOverride;
      const chain =
        srcChain.chainName?.toLowerCase() === newNetwork ? srcChain : destChain;
      setTimeout(() => {
        if (!asset) {
          return;
        }
        addTokenToMetamask(asset, chain);
      }, 2000);
    },
  });
  const router = useRouter();
  const {
    wagmiConnected,
    keplrConnected,
    userSelectionForCosmosWallet,
    setKeplrConnected,
    setUserSelectionForCosmosWallet,
  } = useWalletStore();
  const selectedAssetName = useSwapStore(getSelectedAssetName);
  const { data: max } = useGetMaxTransferAmount();
  const { connect: connectTerraWallet } = useTerraWallet();
  const { isTerraConnected, isTerraInitializingOrConnected } =
    useIsTerraConnected();

  const [searchAssetInput, setSearchAssetInput] = useState<string>();
  const [filteredAssets, setFilteredAssets] = useState<AssetConfigExtended[]>();
  const { balance, loading, terraStationBalance } = useGetAssetBalance();
  const connectTerraStation = useConnectTerraStation();
  const [showBalance, setShowBalance] = useState(false);
  const [balanceToShow, setBalanceToShow] = useState("");
  const ref = useRef(null);

  useEffect(
    () => {
      setTokensToTransfer("");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userSelectionForCosmosWallet]
  );

  useEffect(
    () => {
      if (!router.isReady || selectableAssetList.length === 0) {
        return;
      }
      if (asset) {
        return;
      }
      const assetDenom = router.query.asset_denom as string;
      const foundAsset = selectableAssetList.find(
        (asset) => asset.common_key[ENVIRONMENT] === assetDenom
      );

      // FIXME: weird behaviour
      if (foundAsset) {
        setAsset(asset);
      } else {
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
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.query, selectableAssetList, router.isReady, asset]
  );

  useEffect(() => {
    if (!searchAssetInput) {
      return setFilteredAssets(selectableAssetList);
    }

    const chains = selectableAssetList.filter((asset) =>
      asset.common_key[ENVIRONMENT]?.toLowerCase().includes(searchAssetInput)
    );
    setFilteredAssets(chains);
  }, [searchAssetInput, selectableAssetList]);

  useEffect(() => {
    if (!asset) {
      return;
    }
    // router.push({
    //   query: {
    //     ...router.query,
    //     asset_denom: asset.common_key[ENVIRONMENT],
    //   },
    // });
  }, [asset]);

  // update filtered assets state on chain change
  useEffect(() => {
    const list = selectableAssetList
      .filter((asset) => {
        // @ts-ignore
        return (
          !asset.is_gas_token ||
          (asset.is_gas_token &&
            srcChain.chainName?.toLowerCase() === asset.native_chain)
        );
      })
      .filter((asset) => {
        const srcChainName = srcChain.chainName?.toLowerCase();
        if (asset.is_gas_token && asset.native_chain !== srcChainName) {
          return false;
        }
        return true;
      });

    setFilteredAssets(list || selectableAssetList);
  }, [selectableAssetList, srcChain]);

  useEffect(
    () => {
      const isEVM = !!(srcChain?.module === "evm" && wagmiConnected);
      const isAxelarnet = srcChain?.module === "axelarnet" && keplrConnected;
      const isTerra =
        srcChain?.chainName?.toLowerCase() === "terra" &&
        isTerraConnected &&
        userSelectionForCosmosWallet === "terraStation";

      const shouldshowBalance = isEVM || isAxelarnet || isTerra;
      setShowBalance(shouldshowBalance);

      if (!shouldshowBalance) {
        setBalanceToShow("");
        return;
      }

      if (isEVM) {
        setBalanceToShow(balance);
      } else if (isTerra) {
        setUserSelectionForCosmosWallet("terraStation");
        setBalanceToShow(terraStationBalance as string);
      } else if (isAxelarnet) {
        setBalanceToShow(balance);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      srcChain,
      balance,
      balance,
      wagmiConnected,
      isTerraConnected,
      keplrConnected,
      terraStationBalance,
      userSelectionForCosmosWallet,
    ]
  );

  // update asset balance from useGetAssetBalance hook if srcChain or asset changes
  useEffect(
    () => {
      if (
        srcChain?.chainName?.toLowerCase() === "terra" &&
        userSelectionForCosmosWallet === "terraStation"
      ) {
        if (!isTerraInitializingOrConnected) {
          connectTerraWallet();
        }
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      asset,
      srcChain,
      keplrConnected,
      userSelectionForCosmosWallet,
      isTerraInitializingOrConnected,
    ]
  );

  /**
   * DROPDOWN TOGGLE LOGIC
   */
  useOnClickOutside(ref, () => {
    dropdownOpen && handleOnDropdownToggle();
  });

  function handleOnDropdownToggle() {
    // if (dropdownOpen) setFilteredAssets(selectableAssetList);
    setDropdownOpen(!dropdownOpen);
  }

  // useEffect(() => {
  //   setFilteredAssets(selectableAssetList);
  // }, [selectableAssetList]);

  async function handleOnAssetChange(asset: AssetConfigExtended) {
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
    if (max && +max !== 0 && +bal > +max) {
      setTokensToTransfer(max);
    } else if (Number(bal)) {
      setTokensToTransfer(bal);
    }
  }

  function renderBalanceInfo() {
    if (!(balanceToShow && showBalance)) {
      let textToShow;
      if (srcChain.module === "evm") {
        textToShow = "Metamask";
      } else if (srcChain?.chainName?.toLowerCase() === "terra") {
        if (userSelectionForCosmosWallet === "keplr") {
          textToShow = "Keplr";
        } else {
          textToShow = "Terra Station";
        }
      } else {
        textToShow = "Keplr";
      }
      return (
        <label
          htmlFor="web3-modal"
          className="h-6 space-x-2 text-xs text-gray-500 cursor-pointer hover:underline"
        >
          Connect {textToShow} to see balance
        </label>
      );
    }

    if (srcChain?.chainName?.toLowerCase() !== "terra") {
      return (
        <div className="space-y-1">
          <div className="flex justify-end space-x-2">
            <span className="text-xs text-gray-500">Available</span>
            <span className="w-auto text-xs min-w-[20px] flex justify-end text-[#86d6ff]">
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
          {/* <UnwrapToNativeChainCheckbox /> */}
        </div>
      );
    }

    /**src chain is terra, user selected terra station but is not connected to it */
    if (
      userSelectionForCosmosWallet === "terraStation" &&
      !isTerraInitializingOrConnected
    ) {
      return (
        <label
          htmlFor="web3-modal"
          className="h-6 space-x-2 text-xs text-gray-500 cursor-pointer hover:underline"
        >
          Connect Terra Station to see balance
        </label>
      );
    }

    /**src chain is terra, user selected Keplr but is not connected to it */
    if (userSelectionForCosmosWallet === "keplr" && !keplrConnected) {
      return (
        <label
          htmlFor="web3-modal"
          className="h-6 space-x-2 text-xs text-gray-500 cursor-pointer hover:underline"
        >
          Connect Keplr to see balance
        </label>
      );
    }

    const switchTSAndKeplr = () => {
      const isOnTS = userSelectionForCosmosWallet === "terraStation";
      const switchKeplr = async () => {
        await connectToKeplr(allAssets);
        setKeplrConnected(true);
        setUserSelectionForCosmosWallet("keplr");
      };
      const switchTS = async () => {
        if (!isTerraConnected) {
          connectTerraStation();
        }
        setUserSelectionForCosmosWallet("terraStation");
      };
      return (
        <span
          className="h-6 text-xs text-gray-500 cursor-pointer hover:underline"
          {...makeAccessibleKeysHandler(isOnTS ? switchKeplr : switchTS)}
        >
          <span className="mr-1 text-xs text-gray-500">
            Switch to {isOnTS ? "Keplr" : "Terra Station"}
          </span>
          <Image
            loading="eager"
            src={"/assets/ui/forward-arrow-link.svg"}
            width={10}
            height={10}
            alt="arrow"
          />
        </span>
      );
    };

    return (
      <>
        <div className="flex flex-row justify-end space-x-1">
          <span className="text-xs text-gray-500">
            Available{" "}
            <span className="text-xs text-gray-500">
              {" "}
              {userSelectionForCosmosWallet === "terraStation"
                ? "(Terra Station)"
                : "(Keplr)"}
            </span>
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
        {switchTSAndKeplr()}
      </>
    );
  }

  function renderTokenInput() {
    if (!srcChain) {
      return null;
    }
    return (
      <div className="text-end">
        <input
          className="block text-lg font-bold text-right bg-transparent outline-none"
          type="number"
          value={tokensToTransfer}
          placeholder="0"
          onChange={(e) => setTokensToTransfer(e.target.value)}
        />
        {renderBalanceInfo()}
      </div>
    );
  }

  function renderAssetDropdown() {
    if (!(dropdownOpen && srcChain)) {
      return null;
    }

    return (
      <div className="left-0 w-full h-64 p-2 overflow-auto rounded-lg shadow dropdown-content menu bg-neutral">
        <div className="px-2 py-2 ">
          <input
            className="bg-[#333c42] input input-sm w-full"
            placeholder="Search token"
            onChange={(e) => setSearchAssetInput(e.target.value)}
          />
        </div>
        <ul tabIndex={0} {...makeAccessibleKeysHandler(handleOnDropdownToggle)}>
          {filteredAssets?.map((asset) => {
            return (
              <li key={asset.id}>
                <button onClick={() => handleOnAssetChange(asset)}>
                  <Image
                    loading="eager"
                    src={`/assets/tokens/${asset.id}.logo.svg`}
                    width={35}
                    height={35}
                    onError={(e) => {
                      e.currentTarget.src = defaultAssetImg;
                      e.currentTarget.srcset = defaultAssetImg;
                    }}
                    alt="asset"
                  />
                  <span>
                    {
                      asset.chain_aliases[srcChain.chainName?.toLowerCase()]
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

  function addTokenToMetamaskButton() {
    if (srcChain?.module !== "evm" && destChain?.module !== "evm") {
      return null;
    }
    if (!wagmiConnected) {
      return null;
    }

    const proprtions = 20;
    const image = 20;

    return (
      <div
        className="dropdown dropdown-end dropdown-hover tooltip"
        data-tip="Add token to Metamask"
      >
        <label tabIndex={0} className="mr-2 btn btn-info btn-xs">
          <Image
            loading="eager"
            src={"/assets/wallets/metamask.logo.svg"}
            height={proprtions}
            width={proprtions}
            alt="metamask logo"
          />
        </label>
        <ul
          tabIndex={0}
          className="w-32 p-1 shadow dropdown-content menu bg-base-100 rounded-box"
        >
          {srcChain?.module === "evm" && (
            <li
              {...makeAccessibleKeysHandler(() => {
                switchNetwork?.(
                  getWagmiChains().find(
                    (chain) =>
                      chain.networkNameOverride ===
                      srcChain.chainName?.toLowerCase()
                  )?.id
                );
              })}
            >
              <span>
                <AssetIcon
                  size={image}
                  assetId={asset?.common_key[ENVIRONMENT]}
                  iconSrc={asset?.iconSrc}
                />
                <Image
                  loading="eager"
                  src={`/assets/tokens/${asset?.common_key[ENVIRONMENT]}.logo.svg`}
                  width={image}
                  height={image}
                  onError={(e) => {
                    e.currentTarget.src = defaultAssetImg;
                    e.currentTarget.srcset = defaultAssetImg;
                  }}
                  alt="asset"
                />
                <Arrow />
                <Image
                  loading="eager"
                  src={`/assets/chains/${srcChain.chainName?.toLowerCase()}.logo.svg`}
                  width={image}
                  height={image}
                  onError={(e) => {
                    e.currentTarget.src = defaultChainImg;
                    e.currentTarget.srcset = defaultChainImg;
                  }}
                  alt="chain"
                />
              </span>
            </li>
          )}
          {destChain?.module === "evm" && (
            <li
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
              <span>
                <AssetIcon
                  assetId={asset?.common_key[ENVIRONMENT]}
                  iconSrc={asset?.iconSrc}
                  size={image}
                />
                <Image
                  loading="eager"
                  src={`/assets/tokens/${asset?.common_key[ENVIRONMENT]}.logo.svg`}
                  width={image}
                  height={image}
                  onError={(e) => {
                    e.currentTarget.src = defaultAssetImg;
                    e.currentTarget.srcset = defaultAssetImg;
                  }}
                  alt="asset"
                />
                <Arrow />
                <Image
                  loading="eager"
                  src={`/assets/chains/${destChain.chainName?.toLowerCase()}.logo.svg`}
                  width={image}
                  height={image}
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
  }

  return asset ? (
    <div ref={ref}>
      <div className="flex items-center justify-between h-6">
        <label className="block text-xs">
          I want to transfer from{" "}
          <span className="capitalize">{srcChain.chainName}</span>
        </label>
        <div className="flex items-center">
          {addTokenToMetamaskButton()}
          <MaxButton />
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <Blockable>
          <div className="static flex mt-1 dropdown dropdown-open">
            <div
              tabIndex={0}
              {...makeAccessibleKeysHandler(setDropdownOpen.bind(null, true))}
            >
              <div className="flex items-center w-full space-x-2 text-lg font-medium cursor-pointer">
                <AssetIcon
                  assetId={asset?.common_key[ENVIRONMENT]}
                  iconSrc={asset?.iconSrc}
                  size={30}
                />
                <span>{selectedAssetName}</span>
                <div className="flex items-center">
                  <Image
                    loading="eager"
                    src="/assets/ui/arrow-down.svg"
                    width={35}
                    height={35}
                    alt="arrow down"
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
