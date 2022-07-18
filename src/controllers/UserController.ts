import express, { NextFunction, Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'


const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
    console.log('index')
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.body.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    const user: Omit<User, "id"> = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }
    try {
        const newUser = await store.create(user)
        let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET)
        res.json(token)
    } catch(err) {
        res.status(500)
        res.json(err + user)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await store.authenticate(email, password)
        const token = jwt.sign({user}, process.env.TOKEN_SECRET as unknown as string);
        res.json(user)
    } catch (err) {
        res.status(401)
        res.json({ err })
    }

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
    authenticate
}