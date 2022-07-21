"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DashboardController_1 = require("../controllers/DashboardController");
const dashboardRoutes = (app) => {
    app.get('/products_in_orders', DashboardController_1.productsInOrders);
    app.get('/users-with-orders', DashboardController_1.usersWithOrders);
    app.get('/five-most-expensive', DashboardController_1.fiveMostExpensive);
};
exports.default = dashboardRoutes;
