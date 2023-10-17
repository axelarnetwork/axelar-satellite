import { useState } from "react";
import { Fee, MsgTransfer, Coin as TerraCoin } from "@terra-money/terra.js";
import { Height as TerraHeight } from "@terra-money/terra.js/dist/core/ibc/core/client/Height";
import {
  useConnectedWallet,
  useLCDClient,
  useWallet as useTerraWallet,
} from "@terra-money/wallet-provider";
import toast from "react-hot-toast";
import { Hash, parseUnits } from "viem";

import { TERRA_IBC_GAS_LIMIT } from "~/config/constants";

import { useSwapStore } from "~/store";

import { useIsTerraConnected } from "~/hooks/terra";
import { SwapStatus } from "~/utils/enums";
import { getGasFee } from "~/utils/getGasFee";

export function useTerraTransfer() {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);
  const depositAddress = useSwapStore((state) => state.depositAddress);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);

  const setTxInfo = useSwapStore((state) => state.setTxInfo);
  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);
  const connectedWallet = useConnectedWallet();

  const { isTerraConnected } = useIsTerraConnected();
  const { wallets: terraWallets, connect: connectTerraWallet } =
    useTerraWallet();
  const lcdClient = useLCDClient();
  const [loading, setLoading] = useState(false);

  async function checkMinAmount(amount: string) {
    const minDeposit = await getGasFee(srcChain, destChain, asset);

    return {
      minDeposit,
      minAmountOk: Number(amount) > minDeposit,
    };
  }

  async function sendTokensWithTerra() {
    if (!isTerraConnected) {
      return connectTerraWallet();
    }
    const assetCommonKey = asset?.id;
    const assetData = srcChain.assets?.find(
      (asset) => asset.common_key === assetCommonKey
    );
    const { minAmountOk, minDeposit } = await checkMinAmount(tokensToTransfer);

    if (!minAmountOk) {
      return toast.error(
        `Token amount to transfer should be bigger than ${minDeposit}`
      );
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
    const [_action, _channel, _denom] = assetData?.fullDenomPath?.split(
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
        parseUnits(tokensToTransfer, assetData?.decimals ?? 0).toString()
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
    setLoading(true);
    try {
      console.log("CosmosWalletTransfer: Terra Station IBC transfer");
      const tx = await lcdClient.tx.broadcastSync(signTx.result);
      console.log("TS tx", tx);
      setTxInfo({
        sourceTxHash: tx.txhash as Hash,
      });
      setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
    } catch (e) {
      toast.error((e as Error)?.message);
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  }

  return {
    sendTokensWithTerra,
    loading,
  };
}
