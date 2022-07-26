import pool from '../../config/database'
import * as hashingService from '../../utils/hashing'

import UserModel from '../../models/UserModel'

import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
const userModel = new UserModel()

describe('Test User Endpoints', () => {
    let user;
    let token: string;
    beforeAll(async () => {
        const connection = await pool.connect();
        await connection.query('DELETE FROM users');
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        await connection.release();
        
        user = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@gmail.com',
            password: await hashingService.hashPassword('password123')
        }
        await userModel.create(user);

        const res = await request.post('/api/auth/login')
        .send({
            email: 'john@gmail.com',
            password: 'password123'
        });
        token = res.body.token
    })

    afterAll(async () => {
        const connection = await pool.connect();
        await connection.query('DELETE FROM users');
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        await connection.release();
    })


    it('Index endpoint retruns 401 status if Token not provided', async () => {
        const res = await request.get('/api/users/');

        expect(res.status).toBe(401);
    });

    it('Index endpoint retruns 200, when token is provided', async () => {
        const res = await request.get('/api/users/')
        .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

    it('Show endpoint retruns 200, when token is provided', async () => {
        const res = await request.get('/api/users/1')
        .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(1);
    });

    it('Create endpoint', async () => {
        const res = await request.post('/api/users/').send({           
            id: 2,
            first_name: 'Mohamed',
            last_name: 'Fathy',
            email: 'fathy@gmail.com',
            password: await hashingService.hashPassword('password123')
        });

        expect(res.status).toBe(201);
    });

    it('Update endpoint', async () => {
        const res = await request.put('/api/users/2').send({           
            id: 2,
            first_name: 'Mohamed',
            last_name: 'Salah',
            email: 'fathy@gmail.com',
            password: await hashingService.hashPassword('password123')
        }).set('Authorization', `Bearer ${token}`);

        expect(res.body.last_name).toBe('Salah');
    });

    it('Delete endpoint', async () => {
        const res = await request.delete('/api/users/1')
        .set('Authorization', `Bearer ${token}`);
        expect(res.body.id).toBe(1);
    });

});
