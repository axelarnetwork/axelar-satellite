import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SpinnerDotted } from "spinners-react";

import { connectToKeplr } from "~/components/web3/utils/handleOnKeplrConnect";

import { useSwapStore, useWalletStore } from "~/store";

import { useGetAssetBalance } from "~/hooks";
import { useConnectTerraStation, useIsTerraConnected } from "~/hooks/terra";
import { roundNumberTo } from "~/utils";
import { makeAccessibleKeysHandler } from "~/utils/react";

export const BalanceInfo = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [balanceToShow, setBalanceToShow] = useState("");

  const allAssets = useSwapStore((state) => state.allAssets);

  const { balance, loading, terraStationBalance } = useGetAssetBalance();
  const { isTerraConnected, isTerraInitializingOrConnected } =
    useIsTerraConnected();
  const connectTerraStation = useConnectTerraStation();

  const srcChain = useSwapStore((state) => state.srcChain);
  const userSelectionForCosmosWallet = useWalletStore(
    (state) => state.userSelectionForCosmosWallet
  );
  const keplrConnected = useWalletStore((state) => state.keplrConnected);
  const setKeplrConnected = useWalletStore((state) => state.setKeplrConnected);
  const setUserSelectionForCosmosWallet = useWalletStore(
    (state) => state.setUserSelectionForCosmosWallet
  );

  useEffect(() => {
    const isEVM = !!(srcChain?.module === "evm");
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
  }, [
    srcChain,
    balance,
    isTerraConnected,
    keplrConnected,
    terraStationBalance,
    userSelectionForCosmosWallet,
    setUserSelectionForCosmosWallet,
  ]);

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
          <span className="text-xs text-gray-500">Available Balance:</span>
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
          Available Balance:
          <span className="text-xs text-gray-500">
            {" "}
            {userSelectionForCosmosWallet === "terraStation"
              ? "(Terra Station)"
              : "(Keplr)"}
          </span>
        </span>
        <span className="w-auto text-xs text-[#86d6ff]">
          {loading && (
            <SpinnerDotted
              className="text-blue-500"
              size={15}
              color="#00a6ff"
            />
          )}

          {!loading && roundNumberTo(balanceToShow, 1)}
        </span>
      </div>
      {switchTSAndKeplr()}
    </>
  );
};
