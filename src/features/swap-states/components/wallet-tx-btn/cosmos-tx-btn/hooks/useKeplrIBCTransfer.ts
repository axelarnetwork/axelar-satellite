import { useMemo, useState } from "react";
import { StdFee } from "@cosmjs/launchpad";
import BigNumber from "bignumber.js";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import { utils } from "ethers";
import Long from "long";
import toast from "react-hot-toast";

import { getCosmosChains } from "~/config/web3";
import { connectToKeplr } from "~/components/web3/utils/handleOnKeplrConnect";

import { useSwapStore, useWalletStore } from "~/store";

import { useGetKeplerWallet } from "~/hooks";
import { evmIshSignDirect } from "~/hooks/kepler/evmIsh/evmIshSignDirect";
import { curateCosmosChainId } from "~/utils";
import { SwapStatus } from "~/utils/enums";
import { renderGasFee } from "~/utils/renderGasFee";
import { getSigningClient } from "~/utils/wallet/keplr";

export function useKeplrIBCTransfer() {
  const allAssets = useSwapStore((state) => state.allAssets);
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const depositAddress = useSwapStore((state) => state.depositAddress);
  const asset = useSwapStore((state) => state.asset);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);

  const setTxInfo = useSwapStore((state) => state.setTxInfo);
  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);

  const keplrConnected = useWalletStore((state) => state.keplrConnected);
  const setKeplrConnected = useWalletStore((state) => state.setKeplrConnected);

  const keplerWallet = useGetKeplerWallet();
  const [loading, setLoading] = useState(false);

  const cosmosChain = useMemo(() => {
    const cosmosChains = getCosmosChains(allAssets);
    const chainIdentifier = srcChain.chainName.toLowerCase();
    return cosmosChains.find(
      (chain) => chain.chainIdentifier === chainIdentifier
    );
  }, [allAssets, srcChain]);

  // TODO: need to break down and refactor this 🍝
  async function sendIbcTokensWithKeplr() {
    if (!keplrConnected) {
      await connectToKeplr(allAssets);
      setKeplrConnected(true);
    }
    if (!cosmosChain?.chainId) {
      return toast.error("Chain ID not found");
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

    const [stargateClient, offlineSigner] = await getSigningClient(chain);
    const [{ address: sourceAddress }] = await offlineSigner.getAccounts();

    const assetCommonKey = asset?.id;
    const assetData = srcChain.assets?.find(
      (asset) => asset.common_key === assetCommonKey
    );

    const { minAmountOk, minDeposit } = await checkMinAmount(
      tokensToTransfer,
      assetData?.minDepositAmt
    );

    if (!minAmountOk) {
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit}`
      );
    }

    const sendCoin = {
      denom: assetData?.ibcDenom as string,
      amount: utils
        .parseUnits(tokensToTransfer, assetData?.decimals)
        .toString(),
    };
    const fee: StdFee = {
      gas: chain.gas ?? "250000",
      amount: [{ denom: "uaxl", amount: "30000" }],
    };

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

    try {
      setLoading(true);
      if (srcChain.chainName?.toLowerCase() === "axelar") {
        await stargateClient
          .sendTokens(sourceAddress, depositAddress, [sendCoin], fee)
          .then((e) => {
            console.log("CosmosWalletTransfer: send tokens");
            setTxInfo({
              sourceTxHash: e.transactionHash,
            });

            setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
          })
          .catch((e: Error) => {
            toast.error(e?.message);
            console.log(e);
          });
      } else if (
        ["evmos", "xpla", "acrechain"].includes(
          srcChain.chainName.toLowerCase()
        )
      ) {
        const sendCoin = {
          denom: assetData?.ibcDenom as string,
          amount: utils
            .parseUnits(tokensToTransfer, assetData?.decimals)
            .toString(),
        };
        await evmIshSignDirect(
          sendCoin.amount,
          sendCoin.denom,
          sourceAddress,
          depositAddress,
          srcChain
        )
          .then((res) => {
            console.log(
              "CosmosWalletTransfer: IBC transfer for EVM signer",
              res
            );
            setTxInfo({
              sourceTxHash: res?.transactionHash,
            });
            setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
          })
          .catch((error) => console.log(error));
      } else {
        await stargateClient
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
            setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
          })
          .catch((e: Error) => {
            toast.error(e?.message);
            console.log(e);
          });
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }

  // FIXME: this is a duplicate funciton
  async function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit = (await renderGasFee(srcChain, destChain, asset)) || 0;
    if (new BigNumber(amount || "0").lte(new BigNumber(minDeposit))) {
      return { minDeposit, minAmountOk: false };
    }
    return {
      minDeposit,
      minAmountOk: true,
    };
  }

  return {
    sendIbcTokensWithKeplr,
    loading,
  };
}
