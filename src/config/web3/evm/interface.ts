import { Chain } from "wagmi";

export interface ChainExtension extends Chain {
  networkNameOverride: string;
}
