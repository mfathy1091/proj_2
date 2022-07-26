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
const UserModel_1 = __importDefault(require("../UserModel"));
const hashingService = __importStar(require("../../utils/hashing"));
const userModel = new UserModel_1.default();
describe("User Model >>", () => {
    describe('methods exists', () => {
        it('should have an index method', () => {
            expect(userModel.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(userModel.show).toBeDefined();
        });
        it('should have a create method', () => {
            expect(userModel.create).toBeDefined();
        });
        it('should have a update method', () => {
            expect(userModel.update).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(userModel.delete).toBeDefined();
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
            const createdUser = yield userModel.create(user);
            expect(createdUser === null || createdUser === void 0 ? void 0 : createdUser.email).toEqual(user.email);
            expect(createdUser === null || createdUser === void 0 ? void 0 : createdUser.first_name).toEqual(user.first_name);
            const isPasswordValid = yield hashingService.isPasswordValid('password123', user.password);
            expect(isPasswordValid).toBeTrue();
        }));
        it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield userModel.index();
            expect(result).toEqual([{
                    id: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john@gmail.com',
                }]);
        }));
        it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield userModel.show("1");
            expect(result.id).toEqual(1);
            expect(result.email).toEqual('john@gmail.com');
            expect(result.first_name).toEqual('John');
            expect(result.last_name).toEqual('Doe');
            const isPasswordValid = yield hashingService.isPasswordValid('password123', result.password);
            expect(isPasswordValid).toBeTrue();
        }));
        it('delete method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
            yield userModel.delete("1");
            const result = yield userModel.index();
            expect(result).toEqual([]);
        }));
    }));
});
