import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";
import { OfflineSigner } from "@cosmjs/launchpad";
import { SigningStargateClient, StdFee } from "@cosmjs/stargate";
import { Fee, MsgTransfer, Coin as TerraCoin } from "@terra-money/terra.js";
import { Height as TerraHeight } from "@terra-money/terra.js/dist/core/ibc/core/client/Height";
import {
  useConnectedWallet,
  useLCDClient,
  useWallet as useTerraWallet,
} from "@terra-money/wallet-provider";
import { BigNumber } from "bignumber.js";
import cn from "classnames";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import { utils } from "ethers";
import Long from "long";
import toast from "react-hot-toast";
import { SpinnerRoundFilled } from "spinners-react";

import { ENVIRONMENT } from "~/config/constants";
import { getCosmosChains } from "~/config/web3";
import { connectToKeplr } from "~/components/web3/utils/handleOnKeplrConnect";

import { useSwapStore, useWalletStore } from "~/store";

import {
  useDetectDepositConfirmation,
  useGetKeplerWallet,
  useHasKeplerWallet,
} from "~/hooks";
import { evmIshSignDirect } from "~/hooks/kepler/evmIsh/evmIshSignDirect";
import { useIsTerraConnected } from "~/hooks/terra/useIsTerraConnected";
import { curateCosmosChainId } from "~/utils";
import { renderGasFee } from "~/utils/renderGasFee";

import { TERRA_IBC_GAS_LIMIT } from ".";

export const CosmosWalletTransfer = () => {
  const allAssets = useSwapStore((state) => state.allAssets);
  const [currentAsset, setCurrentAsset] = useState<AssetInfo>();
  const [tokenAddress, setTokenAddress] = useState<string>("");

  const { isTerraConnected, isTerraInitializingOrConnected } =
    useIsTerraConnected();

  // used to hide wallets when transaction has been triggered
  const [isTxOngoing, setIsTxOngoing] = useState(false);
  const [txIsLoading, setTxIsLoading] = useState(false);

  const {
    srcChain,
    destChain,
    asset,
    tokensToTransfer,
    depositAddress,
    setSwapStatus,
    setTxInfo,
  } = useSwapStore((state) => state);
  const {
    setKeplrConnected,
    keplrConnected,
    userSelectionForCosmosWallet,
    setUserSelectionForCosmosWallet,
  } = useWalletStore((state) => state);
  const keplerWallet = useGetKeplerWallet();
  const hasKeplerWallet = useHasKeplerWallet();
  const { wallets: terraWallets, connect: connectTerraWallet } =
    useTerraWallet();
  const connectedWallet = useConnectedWallet();
  const lcdClient = useLCDClient();

  useDetectDepositConfirmation();

  useEffect(
    () => {
      const assetCommonKey = asset?.common_key[ENVIRONMENT];
      const assetData = srcChain.assets?.find(
        (asset) => asset.common_key === assetCommonKey
      );

      setCurrentAsset(assetData);
      setTokenAddress(assetData?.tokenAddress as string);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [asset]
  );

  async function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit = (await renderGasFee(srcChain, destChain, asset)) || 0;
    console.log("min Deposit", minDeposit);
    if (new BigNumber(amount || "0").lte(new BigNumber(minDeposit))) {
      return { minDeposit, minAmountOk: false };
    }
    return {
      minDeposit,
      minAmountOk: true,
    };
  }

  async function handleOnKeplrConnect() {
    const { keplr } = window;
    const chain = getCosmosChains(allAssets).find(
      (chain) => chain.chainIdentifier === "axelar"
    );
    if (!chain) {
      return;
    }
    try {
      await keplr?.enable(chain.chainId);
    } catch (e) {
      console.log(
        "unable to connect to wallet natively, so trying experimental chain",
        e,
        chain.chainId
      );
      try {
        await keplr?.experimentalSuggestChain(chain);
        await keplr?.enable(chain.chainId);
      } catch (e2) {
        console.log("and yet there is a problem in trying to do that too", e2);
      }
    }
    const _signer = (await keplr?.getOfflineSignerAuto(
      chain.chainId
    )) as OfflineSigner;
    const [account] = await _signer.getAccounts();
    if (keplrConnected) {
      toast.error("Wallet already connected");
    }
    setKeplrConnected(true);
    return true;
  }

  async function handleOnTokensTransfer() {
    setTxIsLoading(true);
    // if (!hasKeplerWallet) {
    //   const connectionResult = await handleOnKeplrConnect();
    //   if (!connectionResult) return;
    // }

    const cosmosChains = getCosmosChains(allAssets);
    const chainIdentifier = srcChain.chainName?.toLowerCase();
    const cosmosChain = cosmosChains.find(
      (chain) => chain.chainIdentifier === chainIdentifier
    );
    if (!cosmosChain?.chainId) {
      return toast.error("Chain id not found");
    }

    const chainId = curateCosmosChainId(cosmosChain.chainId);

    const chain = getCosmosChains(allAssets).find(
      (_chain) => _chain.chainId === chainId
    );
    if (!chain) {
      return;
    }
    await keplerWallet?.experimentalSuggestChain(chain);
    await keplerWallet?.enable(chainId as string);

    const offlineSigner = (await keplerWallet?.getOfflineSignerAuto(
      chainId as string
    )) as OfflineSigner;
    const [account1] = await offlineSigner.getAccounts();
    const sourceAddress = account1.address;
    const cosmjs = await SigningStargateClient.connectWithSigner(
      chain.rpc,
      offlineSigner
    );

    const { minAmountOk, minDeposit } = await checkMinAmount(
      tokensToTransfer,
      currentAsset?.minDepositAmt
    );

    if (!minAmountOk) {
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit}`
      );
    }

    const sendCoin = {
      denom: currentAsset?.ibcDenom as string,
      amount: utils
        .parseUnits(tokensToTransfer, currentAsset?.decimals)
        .toString(),
    };
    const fee: StdFee = {
      gas: "250000",
      amount: [{ denom: "uaxl", amount: "30000" }],
    };

    // const key = await keplerWallet?.getKey(chainId as string);

    // const result = await cosmjs.sendTokens(
    //   key?.bech32Address as string,
    //   depositAddress,
    //   [sendCoin],
    //   fee
    // );
    // const [_action, _channel, _denom] = currentAsset?.fullDenomPath?.split(
    //   "/"
    // ) as string[];

    const _action = "transfer";
    const _channel = getCosmosChains(allAssets).find(
      (chain) =>
        chain.chainIdentifier?.toLowerCase() ===
        srcChain.chainName?.toLowerCase()
    )?.chainToAxelarChannelId as string;

    const timeoutHeight: Height = {
      revisionHeight: Long.fromNumber(10),
      revisionNumber: Long.fromNumber(10),
    };
    const timeoutTimestamp = 0;

    let result;

    if (srcChain.chainName?.toLowerCase() === "axelar") {
      try {
        result = cosmjs
          .sendTokens(sourceAddress, depositAddress, [sendCoin], fee)
          .then((e) => {
            console.log("CosmosWalletTransfer: send tokens");
            setTxInfo({
              sourceTxHash: e.transactionHash,
            });

            // setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
          })
          .catch((e) => {
            toast.error(e?.message);
            console.log(e);
          });
      } catch (e) {
        toast.error((e as Error)?.message);
        console.log(e);
      }
    } else if (
      ["evmos", "xpla", "acrechain"].includes(srcChain.chainName.toLowerCase())
    ) {
      const sendCoin = {
        denom: currentAsset?.ibcDenom as string,
        amount: utils
          .parseUnits(tokensToTransfer, currentAsset?.decimals)
          .toString(),
      };
      evmIshSignDirect(
        sendCoin.amount,
        sendCoin.denom,
        sourceAddress,
        depositAddress,
        srcChain
      )
        .then((res) => {
          console.log("CosmosWalletTransfer: IBC transfer for EVM signer", res);

          setTxInfo({
            sourceTxHash: res?.transactionHash,
          });

          setIsTxOngoing(true);
        })
        .catch((error) => {
          let msg = "Unexpected error. Please let us know.";
          if (error?.message?.toLowerCase()?.includes("request rejected")) {
            msg = "Request rejected";
          } else {
            msg = `This looks like a new account that is not yet recognized on ${srcChain.chainName}. Please do a simple transfer from Keplr before using this in-app deposit feature.`;
          }
          toast.error(msg);
          console.log(error);
        });
    } else {
      result = await cosmjs
        .sendIbcTokens(
          sourceAddress,
          depositAddress,
          Coin.fromPartial({
            ...sendCoin,
          }),
          _action,
          _channel,
          timeoutHeight,
          timeoutTimestamp,
          fee
        )
        .then((e) => {
          console.log("CosmosWalletTransfer: IBC transfer");
          setTxInfo({
            sourceTxHash: e.transactionHash,
          });

          setIsTxOngoing(true);
          // setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
        })
        .catch((e) => {
          toast.error(e?.message);
          console.log(e);
        });
    }

    // let result
    // try {
    //   result = await cosmjs.sendTokens(
    //     senderAddress,
    //     depositAddress,
    //     [sendCoin],
    //     fee
    //   )
    // } catch (error: any) {
    //   throw new Error(error)
    // }
    setTxIsLoading(false);
  }

  async function handleOnTerraStationIBCTransfer() {
    const { minAmountOk, minDeposit } = await checkMinAmount(
      tokensToTransfer,
      currentAsset?.minDepositAmt
    );

    if (!minAmountOk) {
      toast.error(
        `Token amount to transfer should be bigger than ${minDeposit}`
      );
      return;
    }
    const sourcePort = "transfer";
    const senderAddress =
      terraWallets && terraWallets.length >= 1
        ? terraWallets[0]?.terraAddress
        : "";
    if (!senderAddress) {
      throw new Error("no sender specified");
    }

    const denom = asset?.chain_aliases["terra"].ibcDenom;
    const [_action, _channel, _denom] = currentAsset?.fullDenomPath?.split(
      "/"
    ) as string[];
    if (!denom) {
      throw new Error(`asset not found: ${_denom}`);
    }
    const fee = new Fee(parseInt(TERRA_IBC_GAS_LIMIT), "30000uluna");
    const transferMsg: MsgTransfer = new MsgTransfer(
      sourcePort,
      _channel,
      new TerraCoin(
        denom,
        utils.parseUnits(tokensToTransfer, currentAsset?.decimals).toString()
      ),
      senderAddress,
      depositAddress,
      new TerraHeight(100, 100),
      undefined
    );

    const signTx = await connectedWallet
      ?.sign({
        msgs: [transferMsg],
        timeoutHeight: 100,
        fee,
      })
      .catch((e) => {
        toast.error(
          `Could not initiate transaction on Terra Station: ${e.message}. Please try again.`
        );
        return null;
      });

    if (!signTx) {
      return;
    }
    try {
      console.log("CosmosWalletTransfer: Terra Station IBC transfer");
      const tx = await lcdClient.tx.broadcastSync(signTx.result);
      console.log("TS tx", tx);
      setTxInfo({
        sourceTxHash: tx.txhash,
      });
      setIsTxOngoing(true);
    } catch (e) {
      toast.error((e as Error)?.message);
      console.log("error", e);
    }
  }

  const getSendButtons = () => {
    if (srcChain?.chainName?.toLowerCase() !== "terra") {
      return (
        <div className="flex justify-center">
          <button
            className={cn("mb-5 ml-5 btn btn-primary", {
              loading: txIsLoading,
            })}
            onClick={handleOnTokensTransfer}
          >
            <span className="mr-2">Send from Keplr</span>
            <div className="flex justify-center my-2 gap-x-5">
              <Image
                src="/assets/wallets/kepler.logo.svg"
                height={25}
                width={25}
                alt="Keplr"
              />
            </div>
          </button>
        </div>
      );
    }

    const userSelectedTS = userSelectionForCosmosWallet === "terraStation";
    const userSelectedKeplr = !userSelectedTS;

    return (
      <div className="flex justify-center">
        <button
          className={cn("mb-5 ml-5 btn", {
            "btn-primary": !userSelectedTS,
            "btn-accent": userSelectedTS,
          })}
          onClick={async () => {
            if (userSelectedKeplr || !isTerraConnected) {
              await handleOnTokensTransfer();
            } else {
              await connectToKeplr(allAssets);
              setKeplrConnected(true);
              setUserSelectionForCosmosWallet("keplr");
              // setKeplrBalance(true);
              // await handleOnTokensTransfer();
            }
          }}
        >
          <span className="mr-2">
            {userSelectedKeplr || !isTerraConnected
              ? "Send from Keplr"
              : "Switch to Keplr"}
          </span>
          <div className="flex justify-center my-2 gap-x-5">
            <Image
              src="/assets/wallets/kepler.logo.svg"
              height={25}
              width={25}
              alt="Keplr"
            />
          </div>
        </button>
        {isTerraConnected && (
          <button
            className={`mb-5 ml-5 btn btn-${
              userSelectedTS ? "primary" : "accent"
            }`}
            onClick={async () => {
              if (userSelectedTS) {
                await handleOnTerraStationIBCTransfer();
              } else {
                if (!isTerraConnected) {
                  await connectTerraWallet();
                }
                setUserSelectionForCosmosWallet("terraStation");
                // await handleOnTerraStationIBCTransfer();
              }
            }}
          >
            <span className="mr-2">
              {userSelectedTS ? "Send from TS" : "Switch to TS"}
            </span>
            <div className="flex justify-center my-2 gap-x-5">
              <Image
                src="/assets/wallets/terra-station.logo.svg"
                height={25}
                width={25}
                alt="Terra Station"
              />
            </div>
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-center my-2 gap-x-5">
        {isTxOngoing ? (
          <div className="flex items-center gap-x-2">
            <SpinnerRoundFilled
              className="text-blue-500"
              size={20}
              color="#00a6ff"
            />
            <span className="text-sm">
              Waiting for transaction confirmation...
            </span>
          </div>
        ) : (
          <div>
            <div className="max-w-xs pb-4 mx-auto text-sm divider">OR</div>
            {getSendButtons()}
          </div>
        )}
      </div>
    </div>
  );
};
