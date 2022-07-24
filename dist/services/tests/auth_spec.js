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
const auth_1 = __importDefault(require("../auth"));
const user_1 = __importDefault(require("../../models/user"));
const database_1 = __importDefault(require("../../config/database"));
const hashingService = __importStar(require("../../utils/hashing"));
const store = new user_1.default();
const authService = new auth_1.default();
describe('Authentication Module', () => {
    it('login method exists', () => {
        expect(authService.login).toBeDefined();
    });
    let user;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM users');
        yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        yield connection.release();
        user = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@gmail.com',
            password: yield hashingService.hashPassword('password123')
        };
        yield store.create(user);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM users');
        yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        yield connection.release();
    }));
    it('login method returns the auth user', () => __awaiter(void 0, void 0, void 0, function* () {
        const authUser = yield authService.login(user.email, 'password123');
        expect(authUser).not.toBe(null);
        expect(authUser === null || authUser === void 0 ? void 0 : authUser.email).toEqual(user.email);
        const isPasswordValid = yield hashingService.isPasswordValid('password123', user.password);
        expect(isPasswordValid).toBeTrue();
    }));
    it('login method returns null when credentials are wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        const authUser = yield authService.login(user.email, 'wrongpassword');
        expect(authUser).toBe(null);
    }));
});
