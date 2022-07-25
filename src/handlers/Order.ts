import { Request, Response, NextFunction } from 'express'
import OrderModel from '../models/Order'
import Order from '../types/order'

const orderModel = new OrderModel()

const index = async (_req: Request, res: Response) => {
    const orders = await orderModel.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order = await orderModel.show(req.params.orderID)
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id,
    }
    try {
        const newOrder = await orderModel.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(500)
        res.json(err)    
    }
}

const update = async (req: Request, res: Response) => {
    const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id,
    }
    try {
        const updatedOrder = await orderModel.update(req.params.orderID, order)
        res.json(updatedOrder)
    } catch(err) {
        res.status(500)
        res.json(err)    
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await orderModel.delete(req.body.id)
    res.json(deleted)
}

const addProduct = async (req: Request, res: Response, next:NextFunction) => {
    const orderId: string = req.params.orderId  // getting orderId from params
    const productId: string = req.body.productId
    const quantity: string = req.body.quantity
    
    try {
        const addedProduct = await orderModel.addProduct(orderId, productId, quantity)
        console.log(addedProduct)
        res.json(addedProduct)
        res.status(201)
    } catch(err) {
        next(err)    
    }
}

const getCurrentOrder = async (req: Request, res: Response, next:NextFunction) => {
    const orderId: string = req.params.orderId  // getting orderId from params
    const productId: string = req.body.productId
    const quantity: string = req.body.quantity
    
    try {
        const addedProduct = await orderModel.addProduct(orderId, productId, quantity)
        console.log(addedProduct)
        res.json(addedProduct)
        res.status(201)
    } catch(err) {
        next(err)    
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