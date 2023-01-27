import type { ResponseHeader } from "../shared";
export declare type XSSProtectionOption = false | "sanitize" | "block-rendering" | ["report", {
    uri: string | URL;
}];
export declare const createXXSSProtectionHeaderValue: (option?: false | ["report", {
    uri: string | URL;
}] | "sanitize" | "block-rendering" | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined;
export declare const createXSSProtectionHeader: (option?: false | ["report", {
    uri: string | URL;
}] | "sanitize" | "block-rendering" | undefined, headerValueCreator?: (option?: false | ["report", {
    uri: string | URL;
}] | "sanitize" | "block-rendering" | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => ResponseHeader;
