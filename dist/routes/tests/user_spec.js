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
const hashingService = __importStar(require("../../utils/hashing"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const userModel = new UserModel_1.default();
describe('Test User Endpoints', () => {
    let user;
    let token;
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
        yield userModel.create(user);
        const res = yield request.post('/api/auth/login')
            .send({
            email: 'john@gmail.com',
            password: 'password123'
        });
        token = res.body.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM users');
        yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        yield connection.release();
    }));
    it('Index endpoint retruns 401 status if Token not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/users/');
        expect(res.status).toBe(401);
    }));
    it('Index endpoint retruns 200, when token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/users/')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
    it('Show endpoint retruns 200, when token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(1);
    }));
    it('Create endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/api/users/').send({
            id: 2,
            first_name: 'Mohamed',
            last_name: 'Fathy',
            email: 'fathy@gmail.com',
            password: yield hashingService.hashPassword('password123')
        });
        expect(res.status).toBe(201);
    }));
    it('Update endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.put('/api/users/2').send({
            id: 2,
            first_name: 'Mohamed',
            last_name: 'Salah',
            email: 'fathy@gmail.com',
            password: yield hashingService.hashPassword('password123')
        }).set('Authorization', `Bearer ${token}`);
        expect(res.body.last_name).toBe('Salah');
    }));
    it('Delete endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.delete('/api/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.body.id).toBe(1);
    }));
});
