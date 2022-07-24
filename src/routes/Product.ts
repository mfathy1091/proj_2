import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/ProductController'

const productRouter = express.Router();

productRouter.get('/', controller.index)

productRouter.get('/:productID', controller.show)

productRouter.post('/', verifyAuthToken, controller.create) 

productRouter.put('/:productID', controller.update) 

productRouter.delete('/:productID', controller.destroy)



export default productRouter;
