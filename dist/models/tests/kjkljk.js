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
const user_1 = __importDefault(require("../user"));
const hashingService = __importStar(require("../../utils/hashing"));
const store = new user_1.default();
describe("User Model >>", () => {
    describe('methods exists', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });
        it('should have a update method', () => {
            expect(store.update).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(store.delete).toBeDefined();
        });
    });
    describe('Testing Logic >>', () => __awaiter(void 0, void 0, void 0, function* () {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            yield connection.query('DELETE FROM users');
            yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            yield connection.release();
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            yield connection.query('DELETE FROM users');
            yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            yield connection.release();
        }));
        it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@gmail.com',
                password: yield hashingService.hashPassword('password123')
            };
            const createdUser = yield store.create(user);
            expect(createdUser === null || createdUser === void 0 ? void 0 : createdUser.email).toEqual(user.email);
            expect(createdUser === null || createdUser === void 0 ? void 0 : createdUser.first_name).toEqual(user.first_name);
            const isPasswordValid = yield hashingService.isPasswordValid('password123', user.password);
            expect(isPasswordValid).toBeTrue();
        }));
        // it('index method should return a list of products', async () => {
        //     const result = await store.index();
        //     expect(result).toEqual([{
        //         id: "1",
        //         first_name: 'John',
        //         last_name: 'Doe',
        //         email: 'john@gmail.com',
        //         password_digest: 'password123'
        //     }]);
        // })
        // it('show method should return the correct user', async () => {
        //     const result = await store.show("1");
        //     expect(result).toEqual({
        //         id: "1",
        //         first_name: 'John',
        //         last_name: 'Doe',
        //         email: 'john@gmail.com',
        //         password_digest: 'password123'
        //     });
        // });
        // it('delete method should remove the user', async () => {
        //     store.delete("1");
        //     const result = await store.index()
        //     expect(result).toEqual([]);
        // });
    }));
});
