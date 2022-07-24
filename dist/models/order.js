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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../config/database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            try {
                const sql = `SELECT * FROM orders`;
                const result = yield connection.query(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get orders  ${err.message}`);
            }
            finally {
                connection.release();
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield connection.query(sql, [id]);
                return result.rows[0];
                connection.release();
            }
            catch (err) {
                throw new Error(`Could not get orders. Error:  ${err.message}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
                const result = yield connection.query(sql, [order.status, order.user_id]);
                connection.release();
                const newOrder = result.rows[0];
                return newOrder;
            }
            catch (err) {
                throw new Error(`Could not create Order. Error:  ${err.message}`);
            }
        });
    }
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "UPDATE orders SET status = $1, user_id = $2 WHERE id=$5";
                const result = yield connection.query(sql, [order.status, order.user_id]);
                connection.release();
                const updatedOrder = result.rows[0];
                return updatedOrder;
            }
            catch (err) {
                throw new Error(`Could not update order. Error:  ${err.message}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "DELETE FROM orders WHERE id=$1";
                const result = yield connection.query(sql, [id]);
                connection.release();
                const order = result.rows[0];
                return order;
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. Error:  ${err.message}`);
            }
        });
    }
    addProduct(orderId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.show(orderId);
                if ((order === null || order === void 0 ? void 0 : order.status) !== 'open') {
                    throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order === null || order === void 0 ? void 0 : order.status}`);
                }
                else {
                    const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
                    const connection = yield database_1.default.connect();
                    const result = yield connection.query(sql, [quantity, orderId, productId]);
                    connection.release();
                    const orderProduct = result.rows[0];
                    return orderProduct;
                }
            }
            catch (err) {
                throw new Error(`Could not add product ${productId} to order ${orderId}. Error:  ${err.message}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
