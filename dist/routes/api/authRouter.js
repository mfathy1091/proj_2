"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_1 = require("./../../models/user");
var AuthController_1 = require("../../controllers/AuthController");
var store = new user_1.UserStore();
var authRouter = express_1["default"].Router();
authRouter.post('/login', AuthController_1.login);
exports["default"] = authRouter;
