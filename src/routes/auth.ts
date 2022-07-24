import express from 'express';

import * as controller from '../controllers/AuthController'

const authRouter = express.Router();

authRouter.post('/login', controller.login)


export default authRouter;
