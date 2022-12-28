import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  getSelectedAssetSymbol,
  useSwapStore,
  useWalletStore,
} from "../../../store";
import { AddressShortener, InputWrapper } from "../../common";
import { CosmosWalletTransfer, EvmWalletTransfer, ProgressBar } from "./parts";
import { copyToClipboard } from "../../../utils";

import { convertChainName } from "../../../utils/transformers";
import { TransferStats } from "../parts";
import { renderGasFee } from "../../../utils/renderGasFee";
import { AssetConfig } from "@axelar-network/axelarjs-sdk";

export const WaitDepositState = () => {
  const { depositAddress, destAddress, srcChain, destChain, asset } =
    useSwapStore((state) => state);
  const { wagmiConnected, keplrConnected } = useWalletStore((state) => state);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);
  const [relayerGasFee, setRelayerGasFee] = useState<string>("");

  useEffect(() => {
    if (!srcChain || !destChain || !asset) return;
    renderGasFee(srcChain, destChain, asset as AssetConfig).then((res) =>
      setRelayerGasFee(res)
    );
  }, [srcChain, destChain, asset]);

  async function renderTransferInfo() {
    if (!relayerGasFee) return;
    return (
      <div>
        <div>
          Please transfer{" "}
          <strong>
            {">"}
            {relayerGasFee} {selectedAssetSymbol}
          </strong>{" "}
          on {convertChainName(srcChain.chainName)} to
        </div>
      </div>
    );
  }

  function renderWalletSection() {
    // if (!wagmiConnected && !keplrConnected) return;

    return (
      <div>
        {srcChain.module === "evm" && <EvmWalletTransfer />}
        {srcChain.module === "axelarnet" && <CosmosWalletTransfer />}
      </div>
    );
  }

  return (
    <>
      <TransferStats />
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="h-full">
              <ProgressBar level={2} />

              <div className="flex items-center justify-center py-4 text-sm gap-x-2">
                <div>
                  <label className="block text-center">
                    {renderTransferInfo()}
                  </label>
                  <div className="flex justify-center font-bold text-info gap-x-2">
                    <AddressShortener value={depositAddress} />
                    <div
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(depositAddress)}
                    >
                      <Image
                        src={"/assets/ui/copy.svg"}
                        height={16}
                        width={16}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {renderWalletSection()}
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
