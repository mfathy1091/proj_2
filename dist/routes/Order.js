"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controllers/OrderController");
const orderRouter = express_1.default.Router();
orderRouter.get('/', OrderController_1.index);
orderRouter.get('/:orderId', OrderController_1.show);
orderRouter.post('/', OrderController_1.create);
orderRouter.put('/:orderId', OrderController_1.update);
orderRouter.delete('/:orderId', OrderController_1.destroy);
orderRouter.post('/:orderId/products', OrderController_1.addProduct);
exports.default = orderRouter;
