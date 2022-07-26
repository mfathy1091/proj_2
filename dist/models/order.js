"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var database_1 = __importDefault(require("../config/database"));
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    OrderModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = "SELECT * FROM orders";
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error("Cannot get orders  ".concat(err_1.message));
                    case 5:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not get orders. Error:  ".concat(err_2.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, newOrder, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
                        return [4 /*yield*/, connection.query(sql, [order.status, order.user_id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        newOrder = result.rows[0];
                        return [2 /*return*/, newOrder];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not create Order. Error:  ".concat(err_3.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.update = function (id, order) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, updatedOrder, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "UPDATE orders SET status = $1, user_id = $2 WHERE id=$5";
                        return [4 /*yield*/, connection.query(sql, [order.status, order.user_id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        updatedOrder = result.rows[0];
                        return [2 /*return*/, updatedOrder];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not update order. Error:  ".concat(err_4.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM orders WHERE id=$1";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        order = result.rows[0];
                        return [2 /*return*/, order];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not delete order ".concat(id, ". Error:  ").concat(err_5.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.addProduct = function (orderId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var order, sql, connection, result, orderProduct, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.show(orderId)];
                    case 1:
                        order = _a.sent();
                        if (!((order === null || order === void 0 ? void 0 : order.status) !== 'open')) return [3 /*break*/, 2];
                        throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, " because order status is ").concat(order === null || order === void 0 ? void 0 : order.status));
                    case 2:
                        sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 3:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [quantity, orderId, productId])];
                    case 4:
                        result = _a.sent();
                        connection.release();
                        orderProduct = result.rows[0];
                        return [2 /*return*/, orderProduct];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_6 = _a.sent();
                        throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, ". Error:  ").concat(err_6.message));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports["default"] = OrderModel;
