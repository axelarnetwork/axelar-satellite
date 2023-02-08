import { bech32 } from "bech32";

/**
 * @param address cosmos based address
 * @param prefix cosmos chain symbol
 */
export function validateCosmosAddress(
  address: string,
  prefix: string
): boolean {
  try {
    const _prefix = bech32.decode(address).prefix;
    return _prefix === prefix?.toLowerCase();
  } catch (error) {
    return false;
  }
}
