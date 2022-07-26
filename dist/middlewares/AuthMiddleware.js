"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Auth_1 = __importDefault(require("../services/Auth"));
var authService = new Auth_1["default"];
var AuthMiddleware = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).send('Not Authorized');
        }
        var token = authorizationHeader.split(' ')[1];
        var decoded = authService.verifyToken(token);
        next(); // No error proceed to next middleware
    }
    catch (err) {
        return res.status(401).send('Not Authorized');
    }
};
exports["default"] = AuthMiddleware;
