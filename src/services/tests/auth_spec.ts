import authQueries from '../auth'
import UserStore from '../../models/user'
import pool from '../../config/database'
import User from '../../types/user'
import { encryptPassword } from '../../utils/hashing'

const store = new UserStore()
const authService = new authQueries();

describe('Authentication Module', () => {
    describe('Tests exists', () => {
        it('login method exists', () => {
            expect(authService.login).toBeDefined();
        });
    });

    describe('Test Module Logic', async () => {
        const user: User = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@gmail.com',
            password_digest: await encryptPassword('password123')
        };

        beforeAll(async () => {
            const newUser = await store.create(user);
        })

        afterAll(async () => {
            const connection = await pool.connect();
            const sql = 'DELETE FROM users';
            await connection.release();
        })

        it('login method returns the auth user', async() => {
            const result = await authService.login(user.email, 'password123')
            expect(result as Omit<User, 'password_digest'>).toEqual(user)
        });
    })
})