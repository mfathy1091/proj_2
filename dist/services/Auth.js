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
//@ts-ignore
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// let saltRounds = process.env.SALT_ROUND
let pepper = process.env.BCRYPT_PASSWORD;
class authQueries {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const connection = yield database_1.default.connect();
            try {
                const sql = 'SELECT password_digest FROM users WHERE email=($1)';
                const result = yield connection.query(sql, [email]);
                if (result.rows.length) {
                    const { password_digest: hashPassword } = result.rows[0];
                    const isPasswordValid = bcrypt_1.default.compareSync(password + pepper, hashPassword);
                    if (isPasswordValid) {
                        const result = yield connection.query('SELECT id, email, first_name, last_name FROM users WHERE email=($1)', [email]);
                        const user = result.rows[0];
                        return user;
                    }
                    else {
                        throw new Error(`Invalid password`);
                    }
                }
                else {
                    throw new Error(`Invalid credentials`);
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
}
exports.default = authQueries;
