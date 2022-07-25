import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../handlers/User'

const userRouter = express.Router();

userRouter.get('/', verifyAuthToken, controller.index)

userRouter.get('/:userId', verifyAuthToken, controller.show)

userRouter.post('/', controller.create)

export default userRouter;
