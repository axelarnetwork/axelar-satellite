import type { ResponseHeader } from "../shared";
export declare type FrameGuardOption = false | "deny" | "sameorigin" | ["allow-from", {
    uri: string | URL;
}];
export declare const createXFrameOptionsHeaderValue: (option?: false | ["allow-from", {
    uri: string | URL;
}] | "deny" | "sameorigin" | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined;
export declare const createFrameGuardHeader: (option?: false | ["allow-from", {
    uri: string | URL;
}] | "deny" | "sameorigin" | undefined, headerValueCreator?: (option?: false | ["allow-from", {
    uri: string | URL;
}] | "deny" | "sameorigin" | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => ResponseHeader;
