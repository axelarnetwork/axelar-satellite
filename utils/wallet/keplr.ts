import { OfflineSigner } from "@cosmjs/launchpad";
import { SigningStargateClient, StdFee } from "@cosmjs/stargate";

export const getSigner = async (chainId: string): Promise<OfflineSigner> => {
  const { keplr } = window;
  return (await keplr?.getOfflineSignerAuto(chainId)) as OfflineSigner;
};

export const getSigningClient = async (
  chainId: string,
  rpcUrl: string
): Promise<SigningStargateClient> => {
  return await SigningStargateClient.connectWithSigner(
    rpcUrl,
    await getSigner(chainId)
  );
};

export const getAddress = async (chainId: string): Promise<string> => {
  const _signer = await getSigner(chainId);
  const [account] = await _signer.getAccounts();
  return account.address;
};
