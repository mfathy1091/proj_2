import pool from '../../config/database'
import * as hashingService from '../../utils/hashing'

import UserModel from '../../models/User'

import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
const userModel = new UserModel()

describe('Test Auth Endpoints', () => {
    beforeAll(async () => {
        const connection = await pool.connect();
        await connection.query('DELETE FROM users');
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        await connection.release();
        
        let user = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@gmail.com',
            password: await hashingService.hashPassword('password123')
        }
        await userModel.create(user);
    })

    afterAll(async () => {
        const connection = await pool.connect();
        await connection.query('DELETE FROM users');
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        await connection.release();
    })


    it('login endpoint', async () => {
        const res = await request.post('/api/auth/login')
                    .send({
                        email: 'john@gmail.com',
                        password: 'password123'
                    });

        expect(res.status).toBe(200);
        expect(res.body.user.id).toEqual(1);
    });
});
