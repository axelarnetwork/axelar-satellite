export declare class WebExtensionUserDenied extends Error {
    constructor();
    toString: () => string;
    toJSON: () => {
        name: string;
    };
}
export declare class WebExtensionCreateTxFailed extends Error {
    constructor(message: string);
    toString: () => string;
    toJSON: () => {
        name: string;
        message: string;
    };
}
export declare class WebExtensionTxFailed extends Error {
    readonly txhash: string | undefined;
    readonly raw_message: any;
    constructor(txhash: string | undefined, message: string, raw_message: any);
    toString: () => string;
    toJSON: () => {
        name: string;
        txhash: string | undefined;
        message: string;
        raw_message: any;
    };
}
export declare class WebExtensionTxUnspecifiedError extends Error {
    constructor(message: string);
    toString: () => string;
    toJSON: () => {
        name: string;
        message: string;
    };
}
export declare class WebExtensionLedgerError extends Error {
    readonly code: number;
    constructor(code: number, message: string);
    toString: () => string;
    toJSON: () => {
        name: string;
        code: number;
        message: string;
    };
}
export declare function isWebExtensionError(error: unknown): boolean;
export declare function createTxErrorFromJson(json: any): WebExtensionUserDenied | WebExtensionCreateTxFailed | WebExtensionTxFailed | WebExtensionLedgerError | WebExtensionTxUnspecifiedError;
