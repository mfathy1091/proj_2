"use strict";
exports.__esModule = true;
var DashboardController_1 = require("../controllers/DashboardController");
var dashboardRoutes = function (app) {
    app.get('/products_in_orders', DashboardController_1.productsInOrders);
    app.get('/users-with-orders', DashboardController_1.usersWithOrders);
    app.get('/five-most-expensive', DashboardController_1.fiveMostExpensive);
};
exports["default"] = dashboardRoutes;
