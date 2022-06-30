import React from "react";
import { useMonitorWalletConnect } from "../../hooks";

export const GlobalHooksContainer = () => {
  useMonitorWalletConnect();
  return null;
};
