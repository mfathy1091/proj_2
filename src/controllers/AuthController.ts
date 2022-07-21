import express, { NextFunction, Request, Response } from 'express'
//@ts-ignore
import jwt from 'jsonwebtoken'
import authQueries from '../services/auth'

const auth = new authQueries()

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await auth.login(email, password)
        const token = jwt.sign({user}, process.env.TOKEN_SECRET as unknown as string);
        res.json(token)
    } catch (err) {
        res.status(401)
        res.json((err as Error).message)    
    }
}


export {
    login
}