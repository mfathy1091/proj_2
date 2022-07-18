import Client from '../config/database';

export type Product = {
    id: number,
    name: string,
    price: number,
}

export class ProductStore {
    
    async index(): Promise<Product[]> {
        const connection = await Client.connect();
        try {
            const sql = `SELECT * FROM products`;
            const result = await connection.query(sql);
            
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products ${err}`)
        } finally {
            connection.release();
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            return result.rows[0];
            connection.release();
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async create(product: Omit<Product, "id">): Promise<Product> {
        try {
            const connection = await Client.connect();
            const sql = "INSERT INTO products (name, price) VALUES ($1, $2) ";
            const result = await connection.query(sql, [product.name, product.price]);
            connection.release();
            const newProduct = result.rows[0];
            return newProduct;
        } catch (err) {
            throw new Error(`Could not create product. Error: ${err}`)
        }
    }

    async update(id: string, product: Omit<Product, "id">): Promise<Product> {
        try {
            const connection = await Client.connect();
            const sql = "UPDATE products SET title = $1, author = $2, total_pages = $3, summary =$4 WHERE id=$5";
            const result = await connection.query(sql, [product.name, product.price]);
            connection.release();
            const updatedProduct = result.rows[0];
            return updatedProduct;
        } catch (err) {
            throw new Error(`Could not update product. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const connection = await Client.connect();
            const sql = "DELETE FROM products WHERE id=$1";
            const result = await connection.query(sql, [id]);
            connection.release();
            const product = result.rows[0];
            return product;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }

}
