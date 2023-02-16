import { useEffect, useState } from "react";
import {
  AxelarQueryClientConfig,
  Environment,
} from "@axelar-network/axelarjs-sdk";
import {
  AxelarQueryClient,
  AxelarQueryClientType,
} from "@axelar-network/axelarjs-sdk/dist/src/libs/AxelarQueryClient";

import { getCosmosChains } from "~/config/web3";

export const useAxelarRPCQuery = () => {
  const [api, setApi] = useState<AxelarQueryClientType>();

  useEffect(() => {
    const queryClientConfig: AxelarQueryClientConfig = {
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT as Environment,
      axelarRpcUrl: getCosmosChains([]).find(
        (chain) => chain.chainIdentifier === "axelar"
      )?.rpc,
    };
    AxelarQueryClient.initOrGetAxelarQueryClient(queryClientConfig).then(
      (res) => setApi(res)
    );
  }, []);

  return { api };
};
