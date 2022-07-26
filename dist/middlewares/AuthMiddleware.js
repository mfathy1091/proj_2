"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("../services/Auth"));
const authService = new Auth_1.default;
const AuthMiddleware = (req, res, next) => {
    try {
        const { authorization: authorizationHeader } = req.headers;
        if (!authorizationHeader) {
            return res.status(401).send('Not Authorized');
        }
        const token = authorizationHeader.split(' ')[1];
        const decoded = authService.verifyToken(token);
        next(); // No error proceed to next middleware
    }
    catch (err) {
        return res.status(401).send('Not Authorized');
    }
};
exports.default = AuthMiddleware;
