//@ts-ignore
import pool from '../config/database'
import { Order, OrderStore } from '../models/order'
const store = new OrderStore()


const getStaus = async (orderId: string) => {
    try {
        //@ts-ignore
        const conn = await pool.connect()
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        const result = await conn.query(sql, [orderId])

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not getStatus of order ${orderId}. Error: ${err}`)
    }
}


export const orderService = {
    getStaus,
}