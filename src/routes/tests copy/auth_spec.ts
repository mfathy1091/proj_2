import pool from '../../config/database'
import * as hashingService from '../../utils/hashing'

import UserStore from '../../models/UserModel'

import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
const userModel = new UserStore()

describe('Test endpoint responses', () => {
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

    it('returns 404 if endpoint is wrong', async () => {
        const res = await request.post('/api/auth/wrong_endpoint');
        expect(res.status).toBe(404);
    });

    it('login endpoint', async () => {
        const res = await request.post('/api/auth/login')
                    .send({
                        email: 'john@gmail.com',
                        password: 'password123'
                    });

        expect(res.status).toBe(200);
    });
});
