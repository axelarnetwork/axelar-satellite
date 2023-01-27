export declare class WalletConnectUserDenied extends Error {
}
export declare class WalletConnectCreateTxFailed extends Error {
    constructor(message: string);
}
export declare class WalletConnectTxFailed extends Error {
    readonly txhash: string;
    readonly raw_message: any;
    constructor(txhash: string, message: string, raw_message: any);
}
export declare class WalletConnectTimeout extends Error {
    constructor(message: string);
}
export declare class WalletConnectTxUnspecifiedError extends Error {
    constructor(message: string);
}
export declare class WalletConnectSignBytesUnspecifiedError extends Error {
    constructor(message: string);
}
