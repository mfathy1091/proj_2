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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.destroy = exports.update = exports.create = exports.show = exports.index = void 0;
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.index();
    res.json(orders);
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.show(req.params.orderID);
    res.json(order);
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        status: req.body.status,
        user_id: req.body.user_id,
    };
    try {
        const newOrder = yield store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(500);
        res.json(err);
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        status: req.body.status,
        user_id: req.body.user_id,
    };
    try {
        const updatedOrder = yield store.update(req.params.orderID, order);
        res.json(updatedOrder);
    }
    catch (err) {
        res.status(500);
        res.json(err);
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(req.body.id);
    res.json(deleted);
});
exports.destroy = destroy;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId; // getting orderId from params
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    try {
        const addedProduct = yield store.addProduct(orderId, productId, quantity);
        console.log(addedProduct);
        res.json(addedProduct);
        res.status(201);
    }
    catch (err) {
        res.status(500);
        res.json(err);
    }
});
exports.addProduct = addProduct;
