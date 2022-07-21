import authQueries from '../auth'
import UserStore from '../../models/user'
import pool from '../../config/database'
import User from '../../types/user'

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
            password_digest: await hashPassword('password123')
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
            expect(authService.login).toBeDefined();
            const result = await authService.login(user.email, user.password_digest)
            expect(result).toEqual(user)
        });
    })
})