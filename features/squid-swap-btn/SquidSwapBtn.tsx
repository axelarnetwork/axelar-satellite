import React, { useEffect } from "react";

import { useGetDepositAddress } from "features/gen-address-btn/hooks";
import {
  checkAsset,
  checkDestAddressFormat,
  checkMinTransfer,
  checkReservedAddresses,
} from "features/gen-address-btn/utils";

import { getReservedAddresses, useSquidStateStore, useSwapStore } from "store";

import { parseUnits } from "ethers/lib/utils.js";
import toast from "react-hot-toast";
import { squid } from "squid.config";
import { SwapStatus } from "utils/enums";
import { showErrorMsgAndThrow } from "utils/error";

const SquidSwapBtn = React.memo(() => {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);

  const swapStatus = useSwapStore((state) => state.swapStatus);
  const resetState = useSwapStore((state) => state.resetState);
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const destAddress = useSwapStore((state) => state.destAddress);

  const reservedAddresses = useSwapStore(getReservedAddresses);

  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);
  const { selectedSquidAsset, squidTokens, squidChains, slippage } =
    useSquidStateStore();

  const { loading, getDepositAddress } = useGetDepositAddress();

  async function handleSwap() {
    // perform sanity checks
    checkAsset(asset, tokensToTransfer);
    checkReservedAddresses(destAddress);
    checkDestAddressFormat(destChain, destAddress);
    reservedAddresses.includes(destAddress) &&
      showErrorMsgAndThrow("Cannot send to this address");
    await checkMinTransfer(tokensToTransfer, srcChain, destChain, asset);

    if (!asset) return;

    // console.log("squid chains", squidChains, squidTokens);

    const params = {
      fromChain: squidChains.find(
        (c) => c.chainName.toLowerCase() === srcChain.id
      )?.chainId,
      fromToken:
        asset.chain_aliases[srcChain.chainName.toLowerCase()].tokenAddress,
      fromAmount: parseUnits(tokensToTransfer, asset.decimals).toString(),
      toChain: squidChains.find(
        (c) => c.chainName.toLowerCase() === destChain.id
      )?.chainId,
      toToken: selectedSquidAsset?.tokenAddress as string, // aUSDC on Avalanche Fuji Testnet
      toAddress: destAddress,
      slippage,
      enableForecall: false, // instant execution service, defaults to true
      quoteOnly: false, // optional, defaults to false
    };

    console.log("trade params", params);

    squid
      // @ts-ignore
      .getRoute(params)
      .then(({ route }) => {
        console.log("route: \n", route);
        // setSwapStatus(SwapStatus.WAIT_FOR_DEPOSIT);
      })
      .catch((err) => {
        // revert back to idle state if error occurs in gen of deposit address
        setSwapStatus(SwapStatus.IDLE);
        showErrorMsgAndThrow(
          err?.message ||
            "Could not find route pair for asset/chain combination"
        );
      });

    return;
  }

  useEffect(() => {
    if (loading) setSwapStatus(SwapStatus.GEN_DEPOSIT_ADDRESS);
  }, [loading, setSwapStatus]);

  if (swapStatus === SwapStatus.FINISHED)
    return (
      <button className="w-full btn btn-primary" onClick={resetState}>
        <div className="flex items-center gap-3">
          <span>Make another transfer?</span>
        </div>
      </button>
    );

  if (swapStatus !== SwapStatus.IDLE)
    return (
      <div className="flex justify-center">
        <div className="relative w-8 h-8">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      </div>
    );

  return (
    <button
      className="w-full text-base font-semibold capitalize btn btn-primary"
      onClick={handleSwap}
    >
      Swap with Squid
    </button>
  );
});

export { SquidSwapBtn };
