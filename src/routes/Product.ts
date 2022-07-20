import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import { 
    index,
    show,
    create,
    update,
    destroy
}  from '../controllers/ProductController'

const productRouter = express.Router();

productRouter.get('/', index)

productRouter.get('/:productID', show)

productRouter.post('/', verifyAuthToken, create) 

productRouter.put('/:productID', update) 

productRouter.delete('/:productID', destroy)



export default productRouter;
