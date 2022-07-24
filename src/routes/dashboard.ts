import express from 'express'
import * as controller from '../controllers/DashboardController'


const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders', controller.productsInOrders)
    app.get('/users-with-orders', controller.usersWithOrders)
    app.get('/five-most-expensive', controller.fiveMostExpensive)
}

export default dashboardRoutes