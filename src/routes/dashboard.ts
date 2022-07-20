import express from 'express'
import { productsInOrders, usersWithOrders, fiveMostExpensive }  from '../controllers/DashboardController'


const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders', productsInOrders)
    app.get('/users-with-orders', usersWithOrders)
    app.get('/five-most-expensive', fiveMostExpensive)
}

export default dashboardRoutes