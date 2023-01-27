import type { ResponseHeader } from "../shared";
export declare type NosniffOption = false | "nosniff";
export declare const createXContentTypeOptionsHeaderValue: (option?: false | "nosniff" | undefined) => string | undefined;
export declare const createNosniffHeader: (option?: false | "nosniff" | undefined, headerValueCreator?: (option?: false | "nosniff" | undefined) => string | undefined) => ResponseHeader;
