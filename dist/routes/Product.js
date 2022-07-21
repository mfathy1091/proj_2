"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const ProductController_1 = require("../controllers/ProductController");
const productRouter = express_1.default.Router();
productRouter.get('/', ProductController_1.index);
productRouter.get('/:productID', ProductController_1.show);
productRouter.post('/', AuthMiddleware_1.default, ProductController_1.create);
productRouter.put('/:productID', ProductController_1.update);
productRouter.delete('/:productID', ProductController_1.destroy);
exports.default = productRouter;
