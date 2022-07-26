import pool from '../../config/database'
import ProductModel from '../ProductModel'

const productModel = new ProductModel()

describe("Product Model", async() => {
    beforeAll(async () => {
        const connection = await pool.connect();
        await connection.query('DELETE FROM products');
        await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
        await connection.release();
    })

    afterAll(async () => {
        const connection = await pool.connect();
        await connection.query('DELETE FROM products');
        await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
        await connection.release();
    })

    it('should have an index method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a update method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await productModel.create({
            name: '32 inch screen',
            price: '3200.99',
        });
        expect(result).toEqual({
            id: 1,
            name: '32 inch screen',
            price: '3200.99',
        });
    });

    it('index method should return a list of products', async () => {
        const result = await productModel.index();
        expect(result).toEqual([{
            id: 1,
            name: '32 inch screen',
            price: '3200.99',
        }]);
    });

    it('show method should return the correct product', async () => {
        const result = await productModel.show("1");
        expect(result).toEqual({
            id: 1,
            name: '32 inch screen',
            price: '3200.99',
        });
    });

    it('delete method should remove the product', async () => {
        await productModel.delete("1");
        const result = await productModel.index()

        expect(result).toEqual([]);
    });
});

