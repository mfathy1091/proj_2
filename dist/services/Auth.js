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
const database_1 = __importDefault(require("../config/database"));
const hashingService = __importStar(require("../utils/hashing"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let pepper = process.env.BCRYPT_PASSWORD;
class AuthService {
    login(email, plainTextPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            try {
                const sql = 'SELECT id, email, first_name, last_name, password FROM users WHERE email=($1)';
                const result = yield connection.query(sql, [email]);
                const user = result.rows[0];
                // if user exists
                if (user) {
                    const { password: hashedPassword } = user;
                    // compare passwords
                    const isPasswordValid = yield hashingService.isPasswordValid(plainTextPassword, hashedPassword);
                    if (isPasswordValid === true) {
                        return user;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw new Error(`Unable to login: ${err.message}`);
            }
            finally {
                connection.release();
            }
        });
    }
    createToken(user) {
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        return token;
    }
    verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        }
        catch (error) {
            return error;
        }
    }
}
exports.default = AuthService;
