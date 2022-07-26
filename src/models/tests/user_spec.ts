import pool from '../../config/database'
import UserModel from '../UserModel'
import * as hashingService from '../../utils/hashing'

const userModel = new UserModel()

describe("User Model >>", () => {
    describe('methods exists', () => {
        it('should have an index method', () => {
            expect(userModel.index).toBeDefined();
        });
    
        it('should have a show method', () => {
            expect(userModel.show).toBeDefined();
        });
    
        it('should have a create method', () => {
            expect(userModel.create).toBeDefined();
        });
    
        it('should have a update method', () => {
            expect(userModel.update).toBeDefined();
        });
    
        it('should have a delete method', () => {
            expect(userModel.delete).toBeDefined();
        });
    });

    describe('Testing Logic >>', async() => {
        beforeAll(async () => {
            const connection = await pool.connect();
            await connection.query('DELETE FROM users');
            await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            await connection.release();
        })
    
        afterAll(async () => {
            const connection = await pool.connect();
            await connection.query('DELETE FROM users');
            await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            await connection.release();
        })
    
        it('create method should add a user', async () => {
            const user = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@gmail.com',
                password: await hashingService.hashPassword('password123')
            }
            
            const createdUser = await userModel.create(user);

            expect(createdUser?.email).toEqual(user.email)
            expect(createdUser?.first_name).toEqual(user.first_name)
            const isPasswordValid = await hashingService.isPasswordValid('password123', user.password as string)
            expect(isPasswordValid).toBeTrue();
        });

        it('index method should return a list of users', async () => {
            const result = await userModel.index();
            expect(result).toEqual([{
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@gmail.com',
            }]);
        })

        it('show method should return the correct user', async () => {
            const result = await userModel.show("1");
            expect(result.id).toEqual(1);
            expect(result.email).toEqual('john@gmail.com');
            expect(result.first_name).toEqual('John');
            expect(result.last_name).toEqual('Doe');
            const isPasswordValid = await hashingService.isPasswordValid('password123', result.password as string)
            expect(isPasswordValid).toBeTrue();
        });

        it('delete method should remove the user', async () => {
            await userModel.delete("1");
            const result = await userModel.index()

            expect(result).toEqual([]);
        });
    });


})