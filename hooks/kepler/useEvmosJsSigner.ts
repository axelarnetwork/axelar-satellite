import {
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from "@tharsis/provider";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import { CosmosChain } from "../../config/web3/cosmos/interface";
import { SigningStargateClient } from "@cosmjs/stargate";
import { fromBase64 } from "@cosmjs/encoding";
import { makeAuthInfoBytes, makeSignDoc } from "@cosmjs/proto-signing";
import { Int53, Uint53 } from "@cosmjs/math";
import { Any } from "cosmjs-types/google/protobuf/any";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

// export const useEvmosJsSigner = async (
//   evmosChain: CosmosChain,
//   sender: string
// ) => {
//   let sign = await window?.keplr?.signDirect(
//     evmosChain.chainId,
//     sender,
//     {
//       bodyBytes: msg.signDirect.body.serializeBinary(),
//       authInfoBytes: msg.signDirect.authInfo.serializeBinary(),
//       chainId: chain.cosmosChainId,
//       accountNumber: new Long(sender.accountNumber),
//     },
//     // @ts-expect-error the types are not updated on Keplr side
//     { isEthereum: true }
//   );
// };

async function sign(
  client: SigningStargateClient, // SigningStargateClient
  signer: OfflineDirectSigner, // keplr OfflineSigner
  chain: CosmosChain,
  signerAddress: string,
  messages: any[],
  fee: any,
  memo: string
) {
  const { chainId, rest } = chain;
  // Query account info, because cosmjs doesn't support Evmos account
  const { accountNumber, sequence } = await fetch(`${rest}/cosmos/auth/v1beta1/accounts/${signerAddress}`)
    .then((res) => res.json())
    .then((res) => res.account.base_account);
  // const { accountNumber, sequence } = await api.getAccountInfo(signerAddress) // GET /cosmos/auth/v1beta1/accounts/{address}
  const accountFromSigner = (await signer.getAccounts()).find(
    (account) => account.address === signerAddress
  );
  if (!accountFromSigner) {
    throw new Error("Failed to retrieve account from signer");
  }

  // Custom typeUrl for EVMOS
  const pubk = Any.fromPartial({
    typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
    value: PubKey.encode({
      key: accountFromSigner.pubkey,
    }).finish(),
  });

  const txBodyEncodeObject = {
    typeUrl: "/cosmos.tx.v1beta1.TxBody",
    value: {
      messages: messages,
      memo: memo,
    },
  };
  const txBodyBytes = client.registry.encode(txBodyEncodeObject);
  const gasLimit = Int53.fromString(fee.gas).toNumber();
  const authInfoBytes = makeAuthInfoBytes(
    [{ pubkey: pubk, sequence }],
    fee.amount,
    gasLimit
  );
  const signDoc = makeSignDoc(
    txBodyBytes,
    authInfoBytes,
    chainId,
    accountNumber
  );
  const { signature, signed } = await signer.signDirect(signerAddress, signDoc);

  // returns txBytes for broadcast
  return TxRaw.encode({
    bodyBytes: signed.bodyBytes,
    authInfoBytes: signed.authInfoBytes,
    signatures: [fromBase64(signature.signature)],
  }).finish();
}
