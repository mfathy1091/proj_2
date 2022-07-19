import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'


const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.params.orderID)
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id,
    }
    try {
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(500)
        res.json(err.message)    
    }
}

const update = async (req: Request, res: Response) => {
    const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id,
    }
    try {
        const updatedOrder = await store.update(req.params.orderID, order)
        res.json(updatedOrder)
    } catch(err) {
        res.status(500)
        res.json(err.message)    
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.orderId  // getting orderId from params
    const productId: string = req.body.productId
    const quantity: string = req.body.quantity
    
    try {
        const addedProduct = await store.addProduct(orderId, productId, quantity)
        console.log(addedProduct)
        res.json(addedProduct)
        res.status(201)
    } catch(err) {
        res.status(500)
        res.json(err.message)    
    }
}

export {
    index,
    show,
    create,
    update,
    destroy,
    addProduct
}