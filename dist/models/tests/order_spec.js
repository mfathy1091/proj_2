"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const database_1 = __importDefault(require("../../config/database"));
const Order_1 = __importDefault(require("../Order"));
const User_1 = __importDefault(require("../User"));
const hashingService = __importStar(require("../../utils/hashing"));
const orderModel = new Order_1.default();
const userModel = new User_1.default();
describe("Order Model", () => __awaiter(void 0, void 0, void 0, function* () {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM orders');
        yield connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
        yield connection.query('DELETE FROM users');
        yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        yield connection.release();
        yield userModel.create({
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@gmail.com',
            password: yield hashingService.hashPassword('password123')
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM orders');
        yield connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
        yield connection.query('DELETE FROM users');
        yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        yield connection.release();
    }));
    it('should have an index method', () => {
        expect(orderModel.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(orderModel.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(orderModel.index).toBeDefined();
    });
    it('should have a update method', () => {
        expect(orderModel.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(orderModel.index).toBeDefined();
    });
    it('create method should add a order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderModel.create({
            status: 'compeleted',
            user_id: '1',
        });
        expect(result).toEqual({
            id: 1,
            status: 'compeleted',
            user_id: '1',
        });
    }));
    it('index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderModel.index();
        expect(result).toEqual([{
                id: 1,
                status: 'compeleted',
                user_id: '1',
            }]);
    }));
    it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderModel.show("1");
        expect(result).toEqual({
            id: 1,
            status: 'compeleted',
            user_id: '1',
        });
    }));
    it('delete method should remove the order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield orderModel.delete("1");
        const result = yield orderModel.index();
        expect(result).toEqual([]);
    }));
}));
