import { ChainInfo } from "@axelar-network/axelarjs-sdk";
import { createTxRaw } from "@evmos/proto";
import {
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from "@evmos/provider";
import {
  MessageIBCMsgTransfer,
  createTxIBCMsgTransfer,
} from "@evmos/transactions";

import Long from "long";

import { getCosmosChains } from "../../../config/web3";
import { CosmosChain } from "../../../config/web3/cosmos/interface";

export const evmIshSignDirect = async (
  amount: string,
  denom: string,
  senderAddress: string,
  depositAddress: string,
  srcChain: ChainInfo
) => {
  const chainName = srcChain.chainName.toLowerCase();
  const keplrConfig: CosmosChain = getCosmosChains([]).find(
    (chain) => chain.chainIdentifier === chainName
  ) as CosmosChain;
  const { chainId: keplrChainId, rest, chainToAxelarChannelId } = keplrConfig;
  const chain = {
    chainId: Number(keplrChainId.split("_")[1].split("-")[0]),
    cosmosChainId: keplrChainId,
  };

  debugger;

  const fetchSenderResults = await fetch(
    `${rest}/cosmos/auth/v1beta1/accounts/${senderAddress}?chain=${chainName}`
  ).then((res) => res.json());
  const { account } = fetchSenderResults;
  const { base_account } = account;
  let address: string,
    pub_key: any,
    account_number,
    sequence: number,
    pubKeyType,
    pubKeyKey;
  if (base_account) {
    address = base_account.address;
    pub_key = base_account.pub_key;
    account_number = base_account.account_number;
    sequence = base_account.sequence;
    pubKeyType = pub_key ? pub_key["@type"] : null;
    pubKeyKey = pub_key?.key;
  } else {
    address = account.address;
    pub_key = account.pub_key;
    account_number = account.account_number;
    sequence = account.sequence;
    pubKeyType = pub_key ? pub_key["@type"] : null;
    pubKeyKey = pub_key?.key;
  }

  const sender = {
    accountAddress: address,
    sequence: sequence,
    accountNumber: account_number,
    pubkey: pubKeyKey,
  };
  console.log("fetch sender results", fetchSenderResults);

  debugger;

  const fee = {
    amount: "20",
    denom: keplrConfig.feeCurrencies[0].coinMinimalDenom,
    gas: "200000",
  };
  const memo = "";
  const params: MessageIBCMsgTransfer = {
    sourcePort: "transfer",
    sourceChannel: chainToAxelarChannelId,
    amount,
    denom,
    receiver: depositAddress,
    revisionNumber: 10,
    revisionHeight: 10,
    timeoutTimestamp: "0",
  };
  const msg = createTxIBCMsgTransfer(chain, sender, fee, memo, params);

  let sign = await window?.keplr?.signDirect(
    chain.cosmosChainId,
    sender.accountAddress,
    {
      bodyBytes: msg.signDirect.body.serializeBinary(),
      authInfoBytes: msg.signDirect.authInfo.serializeBinary(),
      chainId: chain.cosmosChainId,
      accountNumber: new Long(sender.accountNumber),
    },
    // @ts-expect-error the types are not updated on Keplr side
    { isEthereum: true }
  );

  if (sign !== undefined) {
    let rawTx = createTxRaw(sign.signed.bodyBytes, sign.signed.authInfoBytes, [
      new Uint8Array(Buffer.from(sign.signature.signature, "base64")),
    ]);

    // Broadcast it
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: generatePostBodyBroadcast(rawTx),
    };

    let broadcastPost = await fetch(
      `${rest}${generateEndpointBroadcast()}?chain=${chainName}`,
      postOptions
    );
    return await broadcastPost
      .json()
      .then((res) => ({ transactionHash: res?.tx_response?.txhash }));
  }
};
