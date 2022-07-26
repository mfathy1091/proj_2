import express from 'express';

import * as controller from '../handlers/AuthHandler'

const authRouter = express.Router();

authRouter.post('/login', controller.login)


export default authRouter;
