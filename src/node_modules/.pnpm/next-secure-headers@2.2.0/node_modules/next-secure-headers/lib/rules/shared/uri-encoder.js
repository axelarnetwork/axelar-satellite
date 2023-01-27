"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeStrictURI = void 0;
const encodeStrictURI = (uri) => new URL(uri.toString()).toString();
exports.encodeStrictURI = encodeStrictURI;
