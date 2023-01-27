"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFrameGuardHeader = exports.createXFrameOptionsHeaderValue = void 0;
const shared_1 = require("./shared");
const headerName = "X-Frame-Options";
const createXFrameOptionsHeaderValue = (option, strictURIEncoder = shared_1.encodeStrictURI) => {
    if (option == undefined)
        return "deny";
    if (option === false)
        return;
    if (option === "deny")
        return option;
    if (option === "sameorigin")
        return option;
    if (Array.isArray(option)) {
        if (option[0] === "allow-from")
            return `${option[0]} ${strictURIEncoder(option[1].uri)}`;
    }
    throw new Error(`Invalid value for ${headerName}: ${option}`);
};
exports.createXFrameOptionsHeaderValue = createXFrameOptionsHeaderValue;
const createFrameGuardHeader = (option, headerValueCreator = exports.createXFrameOptionsHeaderValue) => {
    const value = headerValueCreator(option);
    return { name: headerName, value };
};
exports.createFrameGuardHeader = createFrameGuardHeader;
