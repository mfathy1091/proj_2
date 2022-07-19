"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var AuthMiddleware_1 = __importDefault(require("../../middlewares/AuthMiddleware"));
var UserController_1 = require("../../controllers/UserController");
var userRouter = express_1["default"].Router();
userRouter.get('/', AuthMiddleware_1["default"], UserController_1.index);
userRouter.post('/', AuthMiddleware_1["default"], UserController_1.create);
exports["default"] = userRouter;
