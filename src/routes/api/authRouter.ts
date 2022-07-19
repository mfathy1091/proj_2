import express from 'express';
import { Request, Response } from 'express';
import { User, UserStore } from './../../models/user';


import { 
    login
}  from '../../controllers/authController'

const store = new UserStore();
const authRouter = express.Router();

authRouter.post('/login', login)


export default authRouter;
