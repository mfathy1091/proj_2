import express from 'express';

import { login }  from '../controllers/AuthController'

const authRouter = express.Router();

authRouter.post('/login', login)


export default authRouter;