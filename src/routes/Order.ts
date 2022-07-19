import express from 'express';

import { 
    index,
    show,
    create,
    update,
    destroy,
    addProduct
}  from '../controllers/OrderController'

const orderRouter = express.Router();

orderRouter.get('/', index)

orderRouter.get('/:orderId', show)

orderRouter.post('/', create) 

orderRouter.put('/:orderId', update) 

orderRouter.delete('/:orderId', destroy)

orderRouter.post('/:orderId/products', addProduct)

export default orderRouter;
