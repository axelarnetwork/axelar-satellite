import { DISABLED_CHAIN_NAMES } from "../../config/constants";

export function getDisabledChains(): string | undefined {
  return DISABLED_CHAIN_NAMES;
}
