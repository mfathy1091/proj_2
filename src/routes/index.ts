import express from 'express';
// import imageRouter from './api/imageRouter';
// import validate from '../validations/imageValidation';
import userRouter from './api/userRouter';

const router = express.Router();

// Middleware to validate the user input
// router.use('/images', validate, imageRouter);
router.use('/users', userRouter)

export default router;
