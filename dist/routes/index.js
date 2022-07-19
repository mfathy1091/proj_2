"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var User_1 = __importDefault(require("./User"));
var auth_1 = __importDefault(require("./auth"));
var Order_1 = __importDefault(require("./Order"));
var Product_1 = __importDefault(require("./Product"));
var router = express_1["default"].Router();
router.use('/users', User_1["default"]);
router.use('/auth', auth_1["default"]);
router.use('/products', Product_1["default"]);
router.use('/orders', Order_1["default"]);
exports["default"] = router;
