"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    try {
        const { authorization: authorizationHeader } = req.headers;
        if (!authorizationHeader) {
            // throw new Error('Not Authorized');
        }
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next(); // No error proceed to next middleware
    }
    catch (err) {
        return res.status(401).send('Not Authorized');
        // next(err) // This will be caught by error handler
    }
};
exports.default = verifyAuthToken;
