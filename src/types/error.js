"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = void 0;
const isError = (toBeDetermined) => {
    return !!toBeDetermined?.message;
};
exports.isError = isError;
