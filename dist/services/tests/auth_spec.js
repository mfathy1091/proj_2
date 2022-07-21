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
const auth_1 = __importDefault(require("../auth"));
const user_1 = __importDefault(require("../../models/user"));
const database_1 = __importDefault(require("../../config/database"));
const store = new user_1.default();
const authService = new auth_1.default();
describe('Authentication Module', () => {
    describe('Tests exists', () => {
        it('login method exists', () => {
            expect(authService.login).toBeDefined();
        });
    });
    describe('Test Module Logic', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@gmail.com',
            password_digest: yield hashPassword('password123')
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = yield store.create(user);
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM users';
            yield connection.release();
        }));
        it('login method returns the auth user', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(authService.login).toBeDefined();
            const result = yield authService.login(user.email, user.password_digest);
            expect(result).toEqual(user);
        }));
    }));
});
