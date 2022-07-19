//@ts-ignore
import pool from '../config/database';
import bcrypt from 'bcrypt'
import { Connection } from 'pg';
import { User } from '../types/user'

let saltRounds = process.env.SALT_ROUND
let pepper = process.env.BCRYPT_PASSWORD


export class UserStore {

    async index(): Promise<User[]> {
        //@ts-ignore
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM users`;
            const result = await connection.query(sql);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        } finally {
            connection.release();
        }
    }

    async show(id: string): Promise<User> {
        try {
            //@ts-ignore
            const connection = await pool.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            return result.rows[0];
            connection.release();
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async create(user: Omit<User, "id">): Promise<User> {
        try {
            // @ts-ignore
            const conn = await pool.connect()
            const sql = 'INSERT INTO users (first_name, last_name, email, password_digest) VALUES($1, $2, $3, $4) RETURNING *'

            const hash = bcrypt.hashSync(
                user.password + pepper,
                parseInt(saltRounds as string)
            );

            const result = await conn.query(sql, [user.first_name, user.last_name,  user.email, hash])
            const newUser = result.rows[0]

            conn.release()

            return newUser
        } catch (err) {
            console.log(err)
            throw new Error(`unable create user (${user.email}): ${err}`)
        }
    }


    async update(id: string, u: User): Promise<User> {
        try {
            //@ts-ignore
            const connection = await pool.connect();
            const sql = "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id=$5";
            const result = await connection.query(sql, [u.first_name, u.last_name, u.email]);
            connection.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`Could not update user. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            //@ts-ignore
            const connection = await pool.connect();
            const sql = "DELETE FROM users WHERE id=$1";
            const result = await connection.query(sql, [id]);
            connection.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    

}
