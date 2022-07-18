import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'


const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
    console.log('index')
}

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.params.productID)
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    const product: Omit<Product, "id"> = {
        name: req.body.name,
        price: req.body.price,
    }
    try {
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    const product: Omit<Product, "id"> = {
        name: req.body.name,
        price: req.body.price,
    }
    try {
        const newProduct = await store.update(req.params.productID, product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

export {
    index,
    show,
    create,
    update,
    destroy,
}