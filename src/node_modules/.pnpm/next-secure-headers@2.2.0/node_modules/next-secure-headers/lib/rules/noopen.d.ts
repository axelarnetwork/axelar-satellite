import type { ResponseHeader } from "../shared";
export declare type NoopenOption = false | "noopen";
export declare const createXDownloadOptionsHeaderValue: (option?: false | "noopen" | undefined) => string | undefined;
export declare const createNoopenHeader: (option?: false | "noopen" | undefined, headerValueCreator?: (option?: false | "noopen" | undefined) => string | undefined) => ResponseHeader;
