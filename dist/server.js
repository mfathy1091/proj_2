"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const ErrorMiddleware_1 = __importDefault(require("./middlewares/ErrorMiddleware"));
const app = (0, express_1.default)();
const address = "127.0.0.1:" + process.env.NODE_PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use((0, morgan_1.default)("common"));
app.use('/api', index_1.default);
app.use((_req, res, next) => {
    const error = {
        status: 404,
        message: 'Not found'
    };
    next(error);
});
app.use(ErrorMiddleware_1.default);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
