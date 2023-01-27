"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapArray = void 0;
const wrapArray = (value) => (Array.isArray(value) ? value : [value]);
exports.wrapArray = wrapArray;
