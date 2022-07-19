import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import Error from '../interfaces/Error'

const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const { authorization: authorizationHeader } = req.headers
        if(!authorizationHeader) {
            // throw new Error('Not Authorized');
        }
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        next() // No error proceed to next middleware
    } catch (err) {
        return res.status(401).send('Not Authorized')
        // next(err) // This will be caught by error handler
    }
}

export default verifyAuthToken