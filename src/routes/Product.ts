import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../handlers/Product'

const productRouter = express.Router();

productRouter.get('/', controller.index)

productRouter.get('/:productID', controller.show)

productRouter.post('/', verifyAuthToken, controller.create) 

productRouter.put('/:productID', verifyAuthToken, controller.update) 

productRouter.delete('/:productID', verifyAuthToken, controller.destroy)



export default productRouter;
