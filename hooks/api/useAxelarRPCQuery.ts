import {
  AxelarQueryClientConfig,
  Environment,
} from "@axelar-network/axelarjs-sdk";
import {
  AxelarQueryClient,
  AxelarQueryClientType,
} from "@axelar-network/axelarjs-sdk/dist/src/libs/AxelarQueryClient";
import { useEffect, useState } from "react";

export const useAxelarRPCQuery = () => {
  const [api, setApi] = useState<AxelarQueryClientType>();

  useEffect(() => {
    const queryClientConfig: AxelarQueryClientConfig = {
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT as Environment,
    };
    AxelarQueryClient.initOrGetAxelarQueryClient(queryClientConfig).then(
      (res) => setApi(res)
    );
  }, []);

  return { api };
};
