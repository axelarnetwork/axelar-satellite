"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createXSSProtectionHeader = exports.createXXSSProtectionHeaderValue = void 0;
const shared_1 = require("./shared");
const headerName = "X-XSS-Protection";
const createXXSSProtectionHeaderValue = (option, strictURIEncoder = shared_1.encodeStrictURI) => {
    if (option == undefined)
        return "1";
    if (option === false)
        return "0";
    if (option === "sanitize")
        return "1";
    if (option === "block-rendering")
        return "1; mode=block";
    if (Array.isArray(option)) {
        if (option[0] === "report")
            return `1; report=${strictURIEncoder(option[1].uri)}`;
    }
    throw new Error(`Invalid value for ${headerName}: ${option}`);
};
exports.createXXSSProtectionHeaderValue = createXXSSProtectionHeaderValue;
const createXSSProtectionHeader = (option, headerValueCreator = exports.createXXSSProtectionHeaderValue) => {
    const value = headerValueCreator(option);
    return { name: headerName, value };
};
exports.createXSSProtectionHeader = createXSSProtectionHeader;
