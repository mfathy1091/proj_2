"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = void 0;
const isError = (toBeDetermined) => {
    return !!(toBeDetermined === null || toBeDetermined === void 0 ? void 0 : toBeDetermined.message);
};
exports.isError = isError;
