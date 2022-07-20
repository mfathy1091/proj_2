import express from 'express';
import userRouter from './User';
import authRouter from './auth';
import orderRouter from './Order';
import productRouter from './Product';
import dashboardRoutes from './dashboard';

const router = express.Router();

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/dashboard', dashboardRoutes)

export default router;
