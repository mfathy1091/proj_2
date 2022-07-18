import { Request, Response, NextFunction } from 'express'
import Error from '../interfaces/Error'

const ErrorMiddleware = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Error'
    res.status(status).json({ status, message })
}

export default ErrorMiddleware