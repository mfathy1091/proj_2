import express, { NextFunction, Request, Response } from 'express'
import { UserStore } from '../models/user'
import { User } from '../types/user'

import jwt from 'jsonwebtoken'


const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.body.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }
    try {
        const newUser = await store.create(user)
        let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as unknown as string)
        res.json(token)
    } catch(err) {
        console.log(err)
        res.status(500)
        res.json(err.message + user)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}



// const articleRoutes = (app: express.Application) => {
//     app.get('/users', index)
//     app.get('/users/:id', show)
//     app.post('/users', create)
//     app.delete('/users', destroy)
//     app.post('/login', authenticate)
// }

// export default articleRoutes

export {
    index,
    show,
    create,
    destroy,
}