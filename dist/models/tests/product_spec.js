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
const database_1 = __importDefault(require("../../config/database"));
const Product_1 = __importDefault(require("../Product"));
const productModel = new Product_1.default();
describe("Product Model", () => __awaiter(void 0, void 0, void 0, function* () {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM products');
        yield connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
        yield connection.release();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM products');
        yield connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
        yield connection.release();
    }));
    it('should have an index method', () => {
        expect(productModel.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(productModel.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(productModel.index).toBeDefined();
    });
    it('should have a update method', () => {
        expect(productModel.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(productModel.index).toBeDefined();
    });
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productModel.create({
            name: '32 inch screen',
            price: '3200.99',
        });
        expect(result).toEqual({
            id: 1,
            name: '32 inch screen',
            price: '3200.99',
        });
    }));
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productModel.index();
        expect(result).toEqual([{
                id: 1,
                name: '32 inch screen',
                price: '3200.99',
            }]);
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productModel.show("1");
        expect(result).toEqual({
            id: 1,
            name: '32 inch screen',
            price: '3200.99',
        });
    }));
    it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
        yield productModel.delete("1");
        const result = yield productModel.index();
        expect(result).toEqual([]);
    }));
}));
