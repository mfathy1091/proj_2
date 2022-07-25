"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./User"));
const Auth_1 = __importDefault(require("./Auth"));
const Order_1 = __importDefault(require("./Order"));
const Product_1 = __importDefault(require("./Product"));
const router = express_1.default.Router();
router.use('/users', User_1.default);
router.use('/auth', Auth_1.default);
router.use('/products', Product_1.default);
router.use('/orders', Order_1.default);
exports.default = router;
