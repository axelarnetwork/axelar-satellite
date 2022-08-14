import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";
import { BigNumber } from "bignumber.js";
import {
  SigningStargateClient,
  StargateClient,
  StdFee,
} from "@cosmjs/stargate";
import { OfflineSigner } from "@cosmjs/launchpad";
import { ENVIRONMENT } from "../../../../config/constants";
import { useSwapStore } from "../../../../store";
import {
  useDetectDepositConfirmation,
  useGetKeplerWallet,
  useHasKeplerWallet,
} from "../../../../hooks";
import { curateCosmosChainId } from "../../../../utils";
import { getCosmosChains } from "../../../../config/web3";
import { utils } from "ethers";
import toast from "react-hot-toast";
import Long from "long";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { SwapStatus } from "../../../../utils/enums";
import { SpinnerRoundOutlined } from "spinners-react";

export const CosmosWalletTransfer = () => {
  const [currentAsset, setCurrentAsset] = useState<AssetInfo>();
  const [tokenAddress, setTokenAddress] = useState<string>("");

  // used to hide wallets when transaction has been triggered
  const [isTxOngoing, setIsTxOngoing] = useState(false);

  const {
    srcChain,
    asset,
    tokensToTransfer,
    depositAddress,
    setSwapStatus,
    setTxInfo,
  } = useSwapStore((state) => state);
  const keplerWallet = useGetKeplerWallet();
  const hasKeplerWallet = useHasKeplerWallet();

  useDetectDepositConfirmation();

  useEffect(() => {
    const assetCommonKey = asset?.common_key[ENVIRONMENT];
    const assetData = srcChain.chainInfo.assets?.find(
      (asset) => asset.common_key === assetCommonKey
    );

    setCurrentAsset(assetData);
    setTokenAddress(assetData?.tokenAddress as string);

    console.log({
      assetCommonKey,
      currentAsset: assetData,
      tokenAddress: assetData?.tokenAddress,
    });
  }, [asset]);

  function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit = minAmount || 0;
    if (new BigNumber(amount || "0") < new BigNumber(minDeposit)) return false;
    return true;
  }

  async function handleOnTokensTransfer() {
    if (!hasKeplerWallet) return;

    const cosmosChains = getCosmosChains();
    const chainIdentifier = srcChain.chainInfo.chainIdentifier[ENVIRONMENT];
    const cosmosChain = cosmosChains.find(
      (chain) => chain.chainIdentifier === chainIdentifier
    );
    if (!cosmosChain?.chainId) return toast.error("Chain id not found");

    const chainId = curateCosmosChainId(cosmosChain.chainId);

    const chain = getCosmosChains().find(
      (_chain) => _chain.chainId === chainId
    );
    if (!chain) return;
    await keplerWallet?.experimentalSuggestChain(chain);
    await keplerWallet?.enable(chainId as string);

    console.log({
      currentAsset,
    });

    const offlineSigner = (await keplerWallet?.getOfflineSignerAuto(
      chainId as string
    )) as OfflineSigner;
    const [account1] = await offlineSigner.getAccounts();
    const sourceAddress = account1.address;
    const cosmjs = await SigningStargateClient.connectWithSigner(
      chain.rpc,
      offlineSigner
    );
    console.log({
      tokensToTransfer,
      "currentAsset?.decimals": currentAsset?.decimals,
    });

    const minAmountOk = checkMinAmount(
      tokensToTransfer,
      currentAsset?.minDepositAmt
    );

    if (!minAmountOk)
      return toast.error(
        `Token amount to transfer should be bigger than ${currentAsset?.minDepositAmt}`
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
    const [_action, _channel, _denom] = currentAsset?.fullDenomPath?.split(
      "/"
    ) as string[];

    const timeoutHeight: Height = {
        revisionHeight: Long.fromNumber(10),
        revisionNumber: Long.fromNumber(10),
      },
      timeoutTimestamp = 0;

    const result = await cosmjs
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
        setTxInfo({
          sourceTxHash: e.transactionHash,
        });

        setIsTxOngoing(true);
        // setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
      })
      .catch((error) => console.log(error));

    console.log({
      res: result,
    });

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
  }

  return (
    <div>
      <div className="flex justify-center my-2 gap-x-5">
        {isTxOngoing ? (
          <div className="flex items-center gap-x-2">
            <SpinnerRoundOutlined
              className="text-blue-500"
              size={20}
              color="#00a6ff"
            />
            <span className="text-xs">
              Waiting for transaction confirmation...
            </span>
          </div>
        ) : (
          <button onClick={handleOnTokensTransfer}>
            <Image
              src="/assets/wallets/kepler.logo.svg"
              height={20}
              width={20}
            />
          </button>
        )}
      </div>
    </div>
  );
};
