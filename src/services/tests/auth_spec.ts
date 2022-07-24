import authQueries from '../auth'
import UserStore from '../../models/user'
import pool from '../../config/database'
import User from '../../types/user'
import * as hashingService from '../../utils/hashing'

const store = new UserStore()
const authService = new authQueries();

describe('Authentication Module', () => {
    it('login method exists', () => {
        expect(authService.login).toBeDefined();
    });

    let user: User

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
        await store.create(user);
    })

    afterAll(async () => {
        const connection = await pool.connect();
        await connection.query('DELETE FROM users');
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        await connection.release();
    })

    it('login method returns the auth user', async() => {
        
        const authUser = await authService.login(user.email, 'password123')            
        expect(authUser).not.toBe(null)
        expect(authUser?.email).toEqual(user.email)
        const isPasswordValid = await hashingService.isPasswordValid('password123', user.password as string)
        expect(isPasswordValid).toBeTrue();
    });

    it('login method returns null when credentials are wrong', async() => {
        const authUser = await authService.login(user.email, 'wrongpassword')
        expect(authUser).toBe(null)
    });



})