import { OfflineSigner } from "@cosmjs/launchpad";
import { QueryClient, SigningStargateClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  QueryBalanceRequest,
  QueryBalanceResponse,
} from "cosmjs-types/cosmos/bank/v1beta1/query";

import { CosmosChain } from "~/config/web3/cosmos/interface";

export const connectChainId = async (chain: CosmosChain): Promise<void> => {
  const { keplr } = window;
  if (!keplr) {
    return;
  }
  try {
    await keplr.enable(chain.chainId);
  } catch (e) {
    console.log(
      "unable to connect to wallet natively, so trying experimental chain",
      e,
      chain.chainId
    );
    try {
      await keplr.experimentalSuggestChain(chain);
      await keplr.enable(chain.chainId);
    } catch (e2) {
      console.log("and yet there is a problem in trying to do that too", e2);
    }
  }
};

export const getSigner = async (chain: CosmosChain): Promise<OfflineSigner> => {
  const { keplr } = window;
  await connectChainId(chain);
  return (await keplr?.getOfflineSignerAuto(chain.chainId)) as OfflineSigner;
};

export const queryBalance = async (
  address: string,
  denom: string,
  rpc: string
) => {
  const tmClient = await Tendermint34Client.connect(rpc);
  const client = QueryClient.withExtensions(tmClient);
  const requestData = Uint8Array.from(
    QueryBalanceRequest.encode({ address, denom }).finish()
  );
  const { value: data } = await client.queryAbci(
    "/cosmos.bank.v1beta1.Query/Balance",
    requestData
  );

  const response = QueryBalanceResponse.decode(data);

  tmClient.disconnect();
  return response.balance;
};
export async function getSigningClient(chain: CosmosChain, rpcUrl?: string) {
  const offlineSigner = await getSigner(chain);

  const stargateClient = await SigningStargateClient.connectWithSigner(
    rpcUrl ?? chain.rpc,
    offlineSigner,
    chain.signingClientOptions
  );

  return [stargateClient, offlineSigner] as const;
}

export const getAddress = async (chain: CosmosChain): Promise<string> => {
  const signer = await getSigner(chain);
  const [account] = await signer.getAccounts();
  return account.address;
};
