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
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            try {
                const sql = `SELECT id, first_name, last_name, email FROM users`;
                const result = yield connection.query(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get users  ${err.message}`);
            }
            finally {
                connection.release();
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get users. Error:  ${err.message}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *';
                const result = yield conn.query(sql, [user.first_name, user.last_name, user.email, user.password]);
                const newUser = result.rows[0];
                conn.release();
                return newUser;
            }
            catch (err) {
                console.log(err);
                throw new Error(`unable create user (${user.email}): ${err.message} `);
            }
        });
    }
    update(id, u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id=$5";
                const result = yield connection.query(sql, [u.first_name, u.last_name, u.email]);
                connection.release();
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new Error(`Could not update user. Error:  ${err.message}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "DELETE FROM users WHERE id=$1";
                const result = yield connection.query(sql, [id]);
                connection.release();
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new Error(`Could not delete user ${id}. Error:  ${err.message}`);
            }
        });
    }
}
exports.default = UserStore;
