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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authService = void 0;
//@ts-ignore
var database_1 = __importDefault(require("../config/database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
// let saltRounds = process.env.SALT_ROUND
var pepper = process.env.BCRYPT_PASSWORD;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, sql, result, hashPassword, isPasswordValid, result_1, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, database_1["default"].connect()];
                case 1:
                    connection = _a.sent();
                    sql = 'SELECT password_digest FROM users WHERE email=($1)';
                    return [4 /*yield*/, connection.query(sql, [email])];
                case 2:
                    result = _a.sent();
                    if (!result.rows.length) return [3 /*break*/, 4];
                    hashPassword = result.rows[0].password_digest;
                    isPasswordValid = bcrypt_1["default"].compareSync(password + pepper, hashPassword);
                    if (!isPasswordValid) return [3 /*break*/, 4];
                    return [4 /*yield*/, connection.query('SELECT id, email, first_name, last_name FROM users WHERE email=($1)', [email])];
                case 3:
                    result_1 = _a.sent();
                    user = result_1.rows[0];
                    return [2 /*return*/, user];
                case 4:
                    connection.release();
                    return [2 /*return*/, null];
                case 5:
                    err_1 = _a.sent();
                    throw new Error("Unable to login: ".concat(err_1.message));
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.authService = {
    login: login
};