"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNoopenHeader = exports.createXDownloadOptionsHeaderValue = void 0;
const headerName = "X-Download-Options";
const createXDownloadOptionsHeaderValue = (option) => {
    if (option == undefined)
        return "noopen";
    if (option === false)
        return;
    if (option === "noopen")
        return option;
    throw new Error(`Invalid value for ${headerName}: ${option}`);
};
exports.createXDownloadOptionsHeaderValue = createXDownloadOptionsHeaderValue;
const createNoopenHeader = (option, headerValueCreator = exports.createXDownloadOptionsHeaderValue) => {
    const value = headerValueCreator(option);
    return { name: headerName, value };
};
exports.createNoopenHeader = createNoopenHeader;
