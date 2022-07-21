"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorMiddleware = (error, _req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Error';
    res.status(status).json({ status, message });
};
exports.default = ErrorMiddleware;
