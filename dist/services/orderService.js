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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../config/database"));
const order_1 = __importDefault(require("../models/order"));
const orderModel = new order_1.default();
const getStaus = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const conn = yield database_1.default.connect();
        const sql = 'SELECT * FROM orders WHERE id=($1)';
        const result = yield conn.query(sql, [orderId]);
        return result.rows[0];
    }
    catch (err) {
        throw new Error(`Could not getStatus of order ${orderId}. Error: ${err}`);
    }
});
exports.orderService = {
    getStaus,
};
