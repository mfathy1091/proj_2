import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/UserController'

const userRouter = express.Router();

userRouter.get('/', verifyAuthToken, controller.index)

userRouter.get('/:userId', verifyAuthToken, controller.show)

userRouter.post('/', verifyAuthToken, controller.create)

export default userRouter;


// const articleRoutes = (app: express.Application) => {
//     app.get('/users', index)
//     app.get('/users/:id', show)
//     app.post('/users', create)
//     app.delete('/users', destroy)
//     app.post('/login', authenticate)
// }
