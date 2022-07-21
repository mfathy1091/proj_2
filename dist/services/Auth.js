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
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// let saltRounds = process.env.SALT_ROUND
let pepper = process.env.BCRYPT_PASSWORD;
class authQueries {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            try {
                const sql = 'SELECT id, email, first_name, last_name, password_digest FROM users WHERE email=($1)';
                const result = yield connection.query(sql, [email]);
                const user = result.rows[0];
                // if user exists
                if (user) {
                    const { password_digest: encryptedPassworerd } = user;
                    // compare passwords
                    const isPasswordValid = bcrypt_1.default.compareSync(password + pepper, encryptedPassworerd);
                    if (isPasswordValid) {
                        return user;
                    }
                    else {
                        throw new Error(`Invalid password`);
                    }
                }
                else {
                    throw new Error(`Invalid Email or Password`);
                }
            }
            catch (err) {
                console.log(err);
                throw new Error(`Unable to login: ${err.message}`);
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.default = authQueries;
