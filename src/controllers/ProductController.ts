import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/Product'

import Product from '../types/product'

const productModel = new ProductModel()

const index = async (_req: Request, res: Response) => {
    const products = await productModel.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const product = await productModel.show(req.params.productID)
    res.json(product)
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
    }
    try {
        const newProduct = await productModel.create(product)
        res.status(201)
        res.json(newProduct)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const product: Omit<Product, "id"> = {
        name: req.body.name,
        price: req.body.price,
    }
    try {
        const newProduct = await productModel.update(req.params.productID, product)
        res.json(newProduct)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await productModel.delete(req.body.id)
    res.json(deleted)
}

export {
    index,
    show,
    create,
    update,
    destroy,
}