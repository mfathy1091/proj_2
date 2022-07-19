import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import { 
    index,
    create,
}  from '../controllers/UserController'

const userRouter = express.Router();

userRouter.get('/', verifyAuthToken, index)

userRouter.post('/', verifyAuthToken, create)

export default userRouter;
