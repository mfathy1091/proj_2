import express from 'express';

import * as controller from '../controllers/OrderController'

const orderRouter = express.Router();

orderRouter.get('/', controller.index)

orderRouter.get('/:orderId', controller.show)

orderRouter.post('/', controller.create) 

orderRouter.put('/:orderId', controller.update) 

orderRouter.delete('/:orderId', controller.destroy)

orderRouter.post('/:orderId/products', controller.addProduct)

export default orderRouter;
