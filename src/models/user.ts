import pool from '../config/database';
import User from '../types/user'

export default class UserStore {

    async index(): Promise<User[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM users`;
            const result = await connection.query(sql);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async show(id: string): Promise<User> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get users. Error:  ${(err as Error).message}`)
        }
    }

    async create(user: User): Promise<User> {
        try {
            
            const conn = await pool.connect()
            const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [user.first_name, user.last_name,  user.email, user.password])
            const newUser = result.rows[0]

            conn.release()

            return newUser
        } catch (err) {
            console.log(err)
            throw new Error(`unable create user (${user.email}): ${(err as Error).message} `)
        }
    }


    async update(id: string, u: User): Promise<User> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id=$5";
            const result = await connection.query(sql, [u.first_name, u.last_name, u.email]);
            connection.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`Could not update user. Error:  ${(err as Error).message}`)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM users WHERE id=$1";
            const result = await connection.query(sql, [id]);
            connection.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error:  ${(err as Error).message}`)
        }
    }

    

}
