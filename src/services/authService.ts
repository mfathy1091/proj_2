
import pool from '../config/database';
import bcrypt from 'bcrypt'
import { Connection } from 'pg';
import { User } from '../types/user'

// let saltRounds = process.env.SALT_ROUND
let pepper = process.env.BCRYPT_PASSWORD

async function login(email: string, password: string): Promise<User | null> {
    try {
        const connection = await pool.connect()
        const sql = 'SELECT password_digest FROM users WHERE email=($1)'
        const result = await connection.query(sql, [email])

        if(result.rows.length) {
            const { password_digest: hashPassword } = result.rows[0];
            const isPasswordValid = bcrypt.compareSync( password+pepper, hashPassword )

            if (isPasswordValid) {
                const result = await connection.query(
                    'SELECT id, email, first_name, last_name FROM users WHERE email=($1)',
                    [email]
                );

                const user = result.rows[0];
                return user;
            }
        }
        connection.release();
        return null
    } catch (err) {
        throw new Error(`Unable to login: ${(err as Error).message}`);
    }


}


export const authService = {
    login
};