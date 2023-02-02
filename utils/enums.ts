export enum Environment {
  DEVNET = "devnet",
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

export enum SwapStatus {
  IDLE = "IDLE",
  GEN_DEPOSIT_ADDRESS = "GEN_DEPOSIT_ADDRESS", // sdk is generating a deposit address
  WAIT_FOR_DEPOSIT = "WAIT_FOR_DEPOSIT", // wait for deposit confirmation event
  WAIT_FOR_SQUID = "WAIT_FOR_SQUID",
  SQUID_FINISHED = "SQUID_FINISHED",
  WAIT_FOR_SRC_TX_PROPAGATION = "WAIT_FOR_SRC_TX_PROPAGATION", // optional state: when tx is passed from the ui
  WAIT_FOR_CONFIRMATION = "WAIT_FOR_CONFIRMATION",
  FINISHED = "FINISHED",
}

export enum SwapOrigin {
  APP = "APP",
  EXCHANGE = "EXCHANGE",
}
