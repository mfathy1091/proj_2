"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            // throw new Error('Not Authorized');
        }
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next(); // No error proceed to next middleware
    }
    catch (err) {
        return res.status(401).send('Not Authorized');
        // next(err) // This will be caught by error handler
    }
};
exports["default"] = verifyAuthToken;
