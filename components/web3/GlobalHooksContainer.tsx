import React from "react";
import {
  useFilterSelectableAssetList,
  useMonitorWalletConnect,
} from "../../hooks";

export const GlobalHooksContainer = () => {
  useMonitorWalletConnect();
  useFilterSelectableAssetList();
  return null;
};
