import express, { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'
import { authService } from '../models/Auth'

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password)
        const token = jwt.sign({user}, process.env.TOKEN_SECRET as unknown as string);
        res.json(token)
    } catch (err) {
        res.status(401)
        res.json(err.message)    
    }
}


export {
    login
}