import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const { authorization: authorizationHeader } = req.headers
        if(!authorizationHeader) {
            // throw new Error('Not Authorized');
        }
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)

        next() // No error proceed to next middleware
    } catch (err) {
        return res.status(401).send('Not Authorized')
        // next(err) // This will be caught by error handler
    }
}

export default verifyAuthToken