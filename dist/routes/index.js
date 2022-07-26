"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
const OrderRoutes_1 = __importDefault(require("./OrderRoutes"));
const ProductRoutes_1 = __importDefault(require("./ProductRoutes"));
const router = express_1.default.Router();
router.use('/users', UserRoutes_1.default);
router.use('/auth', AuthRoutes_1.default);
router.use('/products', ProductRoutes_1.default);
router.use('/orders', OrderRoutes_1.default);
exports.default = router;
