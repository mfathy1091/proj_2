"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
// import imageRouter from './api/imageRouter';
// import validate from '../validations/imageValidation';
var userRouter_1 = __importDefault(require("./api/userRouter"));
var authRouter_1 = __importDefault(require("./api/authRouter"));
var router = express_1["default"].Router();
// Middleware to validate the user input
// router.use('/images', validate, imageRouter);
router.use('/users', userRouter_1["default"]);
router.use('/auth', authRouter_1["default"]);
exports["default"] = router;
