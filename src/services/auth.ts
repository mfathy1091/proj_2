
//@ts-ignore
import pool from '../config/database';
import bcrypt from 'bcrypt'
import { User } from '../types/user'

// let saltRounds = process.env.SALT_ROUND
let pepper = process.env.BCRYPT_PASSWORD

export class authQueries {
    async login(email: string, password: string): Promise<User | null> {
        //@ts-ignore
        const connection = await pool.connect()
        try {
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
                }else {
                    throw new Error(`Invalid password`)
                }
            }else{
                throw new Error(`Invalid credentials`)
            }
        } catch (err) {
            throw new Error(`Unable to login: ${(err as Error).message}`);
        }finally{
            connection.release();
        }
    
    
    }
}

