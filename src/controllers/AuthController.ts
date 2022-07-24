import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import authQueries from '../services/auth'

const auth = new authQueries()

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await auth.login(email, password)
        if(user){
            const token = jwt.sign({user}, process.env.TOKEN_SECRET as unknown as string);
            res.json({ 
                'token': token,
                'user': user 
            })
        }else{
            throw new Error('Unable to Login: wrong credentials')
        }

    } catch (err) {
        next(err)
    }
}


export {
    login
}