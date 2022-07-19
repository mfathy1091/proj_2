import express from 'express';
import { Request, Response } from 'express';
import { User, UserStore } from './../../models/user';
import verifyAuthToken from '../../middlewares/AuthMiddleware'


import { 
    index,
    create,
    login
}  from '../../controllers/UserController'

const store = new UserStore();
const userRouter = express.Router();

userRouter.get('/', verifyAuthToken, index)

userRouter.post('/', verifyAuthToken, create)

userRouter.post('/login', login)

// userRouter.get('/:productID', getProduct)

// userRouter.post('/', createProduct) 

// userRouter.put('/:productID', updateProduct) 

// userRouter.delete('/:productID', deleteProduct)


// const index = userRouter.get('/', async (req: Request, res: Response): Promise<void> => {

// });



export default userRouter;
