"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var ProductController_1 = require("../controllers/ProductController");
var productRouter = express_1["default"].Router();
productRouter.get('/', ProductController_1.index);
productRouter.get('/:productID', ProductController_1.show);
productRouter.post('/', ProductController_1.create);
productRouter.put('/:productID', ProductController_1.update);
productRouter["delete"]('/:productID', ProductController_1.destroy);
exports["default"] = productRouter;
