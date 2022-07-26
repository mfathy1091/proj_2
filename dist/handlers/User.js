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
exports.destroy = exports.update = exports.create = exports.show = exports.index = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const hashing_1 = require("../utils/hashing");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new UserModel_1.default();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel.index();
    res.json(users);
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.show(req.params.userId);
    res.json(user);
});
exports.show = show;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, hashing_1.hashPassword)(req.body.password);
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    };
    try {
        const newUser = yield userModel.create(user);
        let token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.status(201);
        res.json({
            'message': 'Successfuly created!',
            'user': user,
            'token': token
        });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const newUser = yield userModel.update(req.params.userId, user);
        res.json(newUser);
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield userModel.delete(req.params.userId);
        res.json(deletedUser);
    }
    catch (err) {
        next(err);
    }
});
exports.destroy = destroy;
