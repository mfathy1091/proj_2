import express, { NextFunction, Request, Response } from 'express'
import UserModel from '../models/User'
import { hashPassword } from '../utils/hashing'
import User from '../types/user'
import jwt from 'jsonwebtoken'


const userModel = new UserModel()

const index = async (_req: Request, res: Response) => {
    const users = await userModel.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user = await userModel.show(req.params.userId)
    res.json(user)
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const hashedPassword = await hashPassword(req.body.password)
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    }
    try {
        const newUser = await userModel.create(user)
        let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as unknown as string)
        res.status(201)
        res.json({
            'message': 'Successfuly created!',
            'user': user,
            'token': token
        })

    } catch(err) {
        next(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await userModel.delete(req.body.id)
    res.json(deleted)
}

export {
    index,
    show,
    create,
    destroy,
}