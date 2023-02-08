import { utils } from "ethers";

const { isAddress } = utils;

export function validateEvmAddress(address: string): boolean {
  if (!address) {
    return false;
  }
  return isAddress(address);
}
