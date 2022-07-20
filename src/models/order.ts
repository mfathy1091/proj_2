//@ts-ignore
import pool from '../config/database';
import { orderService } from '../services/orderService';

export type Order = {
    id?: number,
    status: string,
    user_id: string,
}

export class OrderStore {
    
    async index(): Promise<Order[]> {
        //@ts-ignore
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM orders`;
            const result = await connection.query(sql);
            
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`)
        } finally {
            connection.release();
        }
    }

    async show(id: string): Promise<Order | null> {
        try {
            //@ts-ignore
            const connection = await pool.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            return result.rows[0];
            connection.release();
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            //@ts-ignore
            const connection = await pool.connect();
            const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
            const result = await connection.query(sql, [order.status, order.user_id]);
            connection.release();
            const newOrder = result.rows[0];
            return newOrder;
        } catch (err) {
            throw new Error(`Could not create Order. Error: ${err}`)
        }
    }

    async update(id: string, order: Omit<Order, "id">): Promise<Order> {
        try {
            //@ts-ignore
            const connection = await pool.connect();
            const sql = "UPDATE orders SET status = $1, user_id = $2 WHERE id=$5";
            const result = await connection.query(sql, [order.status, order.user_id]);
            connection.release();
            const updatedOrder = result.rows[0];
            return updatedOrder;
        } catch (err) {
            throw new Error(`Could not update order. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            //@ts-ignore
            const connection = await pool.connect();
            const sql = "DELETE FROM orders WHERE id=$1";
            const result = await connection.query(sql, [id]);
            connection.release();
            const order = result.rows[0];
            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
    async addProduct(orderId: string, productId: string, quantity: string) {
        try {
            const order = await this.show(orderId)
            if(order?.status !== 'open'){
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order?.status}`)
            }else{
                const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
                //@ts-ignore
                const connection = await pool.connect();
                const result = await connection.query(sql, [quantity, orderId, productId]);
                connection.release();
                const orderProduct = result.rows[0];
                return orderProduct;
            }
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}. Error: ${err}`)
        }
    }

}
