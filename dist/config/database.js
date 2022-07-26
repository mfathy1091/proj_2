"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, NODE_ENV = _a.NODE_ENV;
console.log('NODE_ENV: ' + NODE_ENV);
var envVariables = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
};
if (NODE_ENV === 'test') {
    envVariables = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    };
}
if (NODE_ENV === 'dev') {
    envVariables = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    };
}
if (!NODE_ENV || !['dev', 'test']) {
    throw new Error('NODE_ENV is not set');
}
var pool = new pg_1.Pool(envVariables);
pool.on('error', function (error) {
    console.error(error.message);
});
exports["default"] = pool;
