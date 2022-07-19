"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var index_1 = __importDefault(require("./routes/index"));
var ErrorMiddleware_1 = __importDefault(require("./middlewares/ErrorMiddleware"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use((0, morgan_1["default"])("common"));
app.use('/api', index_1["default"]);
app.use(function (_req, res, next) {
    var error = {
        status: 404,
        message: 'Not found'
    };
    next(error);
});
app.use(ErrorMiddleware_1["default"]);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
