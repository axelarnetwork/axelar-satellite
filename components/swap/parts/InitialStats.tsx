import React, { useEffect, useState } from "react";
import Big from "big.js";

import { ENVIRONMENT } from "../../../config/constants";
import { useSwapStore } from "../../../store";
import { StatsWrapper } from "../../common";
import { useAxelarRPCQuery } from "../../../hooks/api/useAxelarRPCQuery";
import { useContract, useSigner } from "wagmi";
import gatewayABI from "../../../data/abi/axelarGateway.json";
import UseGatewayQuery from "../../../hooks/useGatewayQuery";

export const InitialStats = () => {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const asset = useSwapStore((state) => state.asset);
  const [maxXferAmt, setMaxXferAmt] = useState<null | number>(null);
  const { api } = useAxelarRPCQuery();
  const [gatewayAddr, setGatewayAddr] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (!api) return;
      if (destChain.module !== "evm") return setMaxXferAmt(null);
      const chain = srcChain?.chainName.toLowerCase();
      setGatewayAddr(await (await api?.evm?.GatewayAddress({ chain })).address);
    })();
  }, [destChain, api, srcChain]);

  function renderWaitTime() {
    if (!srcChain) return "";

    if (srcChain.module === "axelarnet") return "~2 minutes";

    if (["ethereum", "polygon"].includes(srcChain.chainName.toLowerCase()))
      return "~15 minutes";

    return "~3 minutes";
  }

  function renderGasFee() {
    if (!srcChain || !destChain) return "";

    const sourceChainName = srcChain.chainIdentifier[ENVIRONMENT];
    const destChainName = destChain.chainIdentifier[ENVIRONMENT];

    const sourceFee = asset?.chain_aliases[sourceChainName]?.minDepositAmt;
    const destFee = asset?.chain_aliases[destChainName]?.minDepositAmt;

    if (!sourceFee || !destFee) return "0";
    return Big(sourceFee).add(Big(destFee)).toString();
  }

  function renderAssetSymbol() {
    if (!asset) return null;
    const assetForChain =
      asset.chain_aliases[srcChain?.chainName?.toLowerCase()];
    if (!assetForChain) return null;
    return assetForChain.assetName;
  }

  function renderMax() {
    if (!gatewayAddr) return null;
    return <UseGatewayQuery gatewayAddr={gatewayAddr} />
  }

  return (
    <StatsWrapper>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span>Relayer Gas Fees:</span>
          <span className="font-semibold">
            {renderGasFee()} {renderAssetSymbol()}
          </span>
        </li>
        <li className="flex justify-between">
          <span>Maximum Transfer Amount:</span>
          <span className="font-semibold">
            {renderMax()}
          </span>
        </li>
        <li className="flex justify-between ">
          <span>Estimated wait time:</span>
          <span className="font-semibold">{renderWaitTime()}</span>
        </li>
      </ul>
    </StatsWrapper>
  );
};
