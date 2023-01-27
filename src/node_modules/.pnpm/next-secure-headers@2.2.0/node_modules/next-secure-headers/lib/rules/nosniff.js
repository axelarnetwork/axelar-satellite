"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNosniffHeader = exports.createXContentTypeOptionsHeaderValue = void 0;
const headerName = "X-Content-Type-Options";
const createXContentTypeOptionsHeaderValue = (option) => {
    if (option == undefined)
        return "nosniff";
    if (option === false)
        return;
    if (option === "nosniff")
        return option;
    throw new Error(`Invalid value for ${headerName}: ${option}`);
};
exports.createXContentTypeOptionsHeaderValue = createXContentTypeOptionsHeaderValue;
const createNosniffHeader = (option, headerValueCreator = exports.createXContentTypeOptionsHeaderValue) => {
    const value = headerValueCreator(option);
    return { name: headerName, value };
};
exports.createNosniffHeader = createNosniffHeader;
