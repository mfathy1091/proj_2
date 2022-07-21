"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./User"));
const auth_1 = __importDefault(require("./auth"));
const Order_1 = __importDefault(require("./Order"));
const Product_1 = __importDefault(require("./Product"));
const dashboard_1 = __importDefault(require("./dashboard"));
const router = express_1.default.Router();
router.use('/users', User_1.default);
router.use('/auth', auth_1.default);
router.use('/products', Product_1.default);
router.use('/orders', Order_1.default);
router.use('/dashboard', dashboard_1.default);
exports.default = router;
