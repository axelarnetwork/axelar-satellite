import { useState } from "react";

import { TERRA_IBC_GAS_LIMIT } from "components/swap/states/parts";

import { Fee, MsgTransfer, Coin as TerraCoin } from "@terra-money/terra.js";
import { Height as TerraHeight } from "@terra-money/terra.js/dist/core/ibc/core/client/Height";
import {
  useConnectedWallet,
  useLCDClient,
  useWallet as useTerraWallet,
} from "@terra-money/wallet-provider";

import { useSwapStore } from "store";

import { BigNumber } from "bignumber.js";
import { utils } from "ethers";
import toast from "react-hot-toast";
import { SwapStatus } from "utils/enums";
import { renderGasFee } from "utils/renderGasFee";

export function useTerraTransfer() {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);
  const depositAddress = useSwapStore((state) => state.depositAddress);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);

  const setTxInfo = useSwapStore((state) => state.setTxInfo);
  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);
  const connectedWallet = useConnectedWallet();

  const { wallets: terraWallets, connect: connectTerraWallet } =
    useTerraWallet();
  const lcdClient = useLCDClient();
  const [loading, setLoading] = useState(false);

  // FIXME: duplicate
  async function checkMinAmount(amount: string, minAmount?: number) {
    const minDeposit = (await renderGasFee(srcChain, destChain, asset)) || 0;
    console.log("min Deposit", minDeposit);
    if (new BigNumber(amount || "0").lte(new BigNumber(minDeposit)))
      return { minDeposit, minAmountOk: false };
    return {
      minDeposit,
      minAmountOk: true,
    };
  }

  async function sendTokensWithTerra() {
    const assetCommonKey = asset?.id;
    const assetData = srcChain.assets?.find(
      (asset) => asset.common_key === assetCommonKey
    );
    const { minAmountOk, minDeposit } = await checkMinAmount(
      tokensToTransfer,
      assetData?.minDepositAmt
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
    const [_action, _channel, _denom] = assetData?.fullDenomPath?.split(
      "/"
    ) as string[];
    if (!denom) throw new Error("asset not found: " + _denom);
    const fee = new Fee(parseInt(TERRA_IBC_GAS_LIMIT), "30000uluna");
    const transferMsg: MsgTransfer = new MsgTransfer(
      sourcePort,
      _channel,
      new TerraCoin(
        denom,
        utils.parseUnits(tokensToTransfer, assetData?.decimals).toString()
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
    setLoading(true);
    try {
      console.log("CosmosWalletTransfer: Terra Station IBC transfer");
      const tx = await lcdClient.tx.broadcastSync(signTx.result);
      console.log("TS tx", tx);
      setTxInfo({
        sourceTxHash: tx.txhash,
      });
      setSwapStatus(SwapStatus.WAIT_FOR_CONFIRMATION);
    } catch (e: any) {
      toast.error(e?.message as any);
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
