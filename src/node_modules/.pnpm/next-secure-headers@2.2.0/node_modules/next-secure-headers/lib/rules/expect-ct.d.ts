import type { ResponseHeader } from "../shared";
export declare type ExpectCTOption = boolean | [true, Partial<{
    maxAge: number;
    enforce: boolean;
    reportURI: string | URL;
}>];
export declare const createExpectCTHeaderValue: (option?: boolean | [true, Partial<{
    maxAge: number;
    enforce: boolean;
    reportURI: string | URL;
}>] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined;
export declare const createExpectCTHeader: (option?: boolean | [true, Partial<{
    maxAge: number;
    enforce: boolean;
    reportURI: string | URL;
}>] | undefined, headerValueCreator?: (option?: boolean | [true, Partial<{
    maxAge: number;
    enforce: boolean;
    reportURI: string | URL;
}>] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => ResponseHeader | undefined;
