import express from 'express';
import userRouter from './UserRoutes';
import authRouter from './AuthRoutes';
import orderRouter from './OrderRoutes';
import productRouter from './ProductRoutes';

const router = express.Router();

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

export default router;
