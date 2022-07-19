import express, { NextFunction, Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import { login } from '../services/authService'

const authService = new UserStore()

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await login(email, password)
        const token = jwt.sign({user}, process.env.TOKEN_SECRET as unknown as string);
        res.json(token)
    } catch (err) {
        res.status(401)
        res.json({ err })
    }
}


export {
    login
}