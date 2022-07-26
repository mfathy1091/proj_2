"use strict";
exports.__esModule = true;
var ErrorHandler = function (error, _req, res, next) {
    var status = error.status || 500;
    var message = error.message || 'Error';
    res.status(status).json({ status: status, message: message });
};
exports["default"] = ErrorHandler;
