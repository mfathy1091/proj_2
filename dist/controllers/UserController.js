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
exports.destroy = exports.create = exports.show = exports.index = void 0;
const user_1 = __importDefault(require("../models/user"));
const hashing_1 = require("../utils/hashing");
//@ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.default();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.index();
    res.json(users);
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.show(req.params.userId);
    res.json(user);
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, hashing_1.hashPassword)(req.body.password);
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password_digest: hashedPassword
    };
    try {
        const newUser = yield store.create(user);
        let token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.status(201);
        res.json(token);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json(err);
    }
});
exports.create = create;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(req.body.id);
    res.json(deleted);
});
exports.destroy = destroy;
