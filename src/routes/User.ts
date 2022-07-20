import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import { 
    index,
    create,
    show
}  from '../controllers/UserController'

const userRouter = express.Router();

userRouter.get('/', verifyAuthToken, index)

userRouter.get('/:userId', verifyAuthToken, show)

userRouter.post('/', verifyAuthToken, create)

export default userRouter;
