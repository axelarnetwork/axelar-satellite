import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AssetConfig,
  AssetInfo,
  CosmosChain,
} from "@axelar-network/axelarjs-sdk";
import { BigNumber } from "bignumber.js";
import {
  SigningStargateClient,
  StargateClient,
  StdFee,
} from "@cosmjs/stargate";
import { OfflineSigner } from "@cosmjs/launchpad";
import { ENVIRONMENT } from "../../../../config/constants";
import { useSwapStore, useWalletStore } from "../../../../store";
import {
  useDetectDepositConfirmation,
  useGetAssetBalance,
  useGetKeplerWallet,
  useHasKeplerWallet,
} from "../../../../hooks";
import { curateCosmosChainId } from "../../../../utils";
import { getCosmosChains } from "../../../../config/web3";
import { ethers, utils } from "ethers";
import toast from "react-hot-toast";
import Long from "long";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { SwapStatus } from "../../../../utils/enums";
import { SpinnerRoundFilled } from "spinners-react";
import { renderGasFee } from "../../../../utils/renderGasFee";
import {
  useWallet as useTerraWallet,
  WalletStatus,
  useConnectedWallet,
  useLCDClient,
} from "@terra-money/wallet-provider";
import {
  Coin as TerraCoin,
  Fee,
  LCDClient,
  MsgTransfer,
} from "@terra-money/terra.js";
import cn from "classnames";
import { Height as TerraHeight } from "@terra-money/terra.js/dist/core/ibc/core/client/Height";
import { TERRA_IBC_GAS_LIMIT } from ".";
import { connectToKeplr } from "../../../web3/utils/handleOnKeplrConnect";
import { useIsTerraConnected } from "../../../../hooks/terra/useIsTerraConnected";
import { evmosSignDirect } from "../../../../hooks/kepler/evmos/evmosSignDirect";
import { NativeAssetConfig } from "../../../../config/web3/evm/native-assets";

export const CosmosWalletTransfer = () => {
  const allAssets = useSwapStore((state) => state.allAssets);
  const [currentAsset, setCurrentAsset] = useState<AssetInfo>();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const { setKeplrBalance } = useGetAssetBalance();
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

  useEffect(() => {
    const assetCommonKey = asset?.common_key[ENVIRONMENT];
    const assetData = srcChain.assets?.find(
      (asset) => asset.common_key === assetCommonKey
    );

    setCurrentAsset(assetData);
    setTokenAddress(assetData?.tokenAddress as string);
  }, [asset]);

  function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit =
      renderGasFee(srcChain, destChain, asset as NativeAssetConfig) || 0;
    console.log("min Deposit", minDeposit);
    if (new BigNumber(amount || "0").lte(new BigNumber(minDeposit)))
      return { minDeposit, minAmountOk: false };
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
    if (!chain) return;
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
      } catch (e2: any) {
        console.log("and yet there is a problem in trying to do that too", e2);
      }
    }
    const _signer = (await keplr?.getOfflineSignerAuto(
      chain.chainId
    )) as OfflineSigner;
    const [account] = await _signer.getAccounts();
    if (keplrConnected) toast.error("Wallet already connected");
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
    if (!cosmosChain?.chainId) return toast.error("Chain id not found");

    const chainId = curateCosmosChainId(cosmosChain.chainId);

    const chain = getCosmosChains(allAssets).find(
      (_chain) => _chain.chainId === chainId
    );
    if (!chain) return;
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

    const { minAmountOk, minDeposit } = checkMinAmount(
      tokensToTransfer,
      currentAsset?.minDepositAmt
    );

    if (!minAmountOk)
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit}`
      );

    const sendCoin = {
      denom: currentAsset?.ibcDenom as string,
      amount: utils
        .parseUnits(tokensToTransfer, currentAsset?.decimals)
        .toString(),
    };
    const fee: StdFee = {
      gas: "150000",
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
      },
      timeoutTimestamp = 0;

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
            toast.error(e?.message as any);
            console.log(e);
          });
      } catch (e: any) {
        toast.error(e?.message as any);
        console.log(e);
      }
    } else if (srcChain.chainName?.toLowerCase() === "evmos") {
      const sendCoin = {
        denom: currentAsset?.ibcDenom as string,
        amount: utils
          .parseUnits(tokensToTransfer, currentAsset?.decimals)
          .toString(),
      };
      evmosSignDirect(
        sendCoin.amount,
        sendCoin.denom,
        sourceAddress,
        depositAddress
      )
        .then((res: any) => {
          console.log("CosmosWalletTransfer: IBC transfer for EvmosJS", res);

          setTxInfo({
            sourceTxHash: res.transactionHash,
          });

          setIsTxOngoing(true);
        })
        .catch((error) => console.log(error));
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
        .catch((e: any) => {
          toast.error(e?.message as any);
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

  async function handleOnTerraStationIBCTransfer(): Promise<any> {
    const { minAmountOk, minDeposit } = checkMinAmount(
      tokensToTransfer,
      currentAsset?.minDepositAmt
    );

    if (!minAmountOk)
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit}`
      );
    const sourcePort = "transfer";
    const senderAddress =
      terraWallets && terraWallets.length >= 1
        ? terraWallets[0]?.terraAddress
        : "";
    if (!senderAddress) throw new Error("no sender specified");

    const denom = asset?.chain_aliases["terra"].ibcDenom;
    const [_action, _channel, _denom] = currentAsset?.fullDenomPath?.split(
      "/"
    ) as string[];
    if (!denom) throw new Error("asset not found: " + _denom);
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

    if (!signTx) return;
    try {
      console.log("CosmosWalletTransfer: Terra Station IBC transfer");
      const tx = await lcdClient.tx.broadcastSync(signTx.result);
      console.log("TS tx", tx);
      setTxInfo({
        sourceTxHash: tx.txhash,
      });
      setIsTxOngoing(true);
    } catch (e: any) {
      toast.error(e?.message as any);
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
                if (!isTerraConnected) await connectTerraWallet();
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
