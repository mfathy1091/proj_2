"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const UserController_1 = require("../controllers/UserController");
const userRouter = express_1.default.Router();
userRouter.get('/', AuthMiddleware_1.default, UserController_1.index);
userRouter.get('/:userId', AuthMiddleware_1.default, UserController_1.show);
userRouter.post('/', AuthMiddleware_1.default, UserController_1.create);
exports.default = userRouter;
