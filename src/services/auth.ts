
import pool from '../config/database';
import bcrypt from 'bcrypt'
import User  from '../types/user'

// let saltRounds = process.env.SALT_ROUND
let pepper = process.env.BCRYPT_PASSWORD

export default class authQueries {
    async login(email: string, password: string): Promise<User | null> {
        const connection = await pool.connect()
        try {

            const userStoredPassword = await this.getUserStoredPassword(email);
            if(userStoredPassword !== null) {
                const isPasswordValid = bcrypt.compareSync( password+pepper, hashedPassword )
    
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

    async getStoredCredentials(email: string): Promise<boolean> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT id, email, first_name, last_name FROM users WHERE email=($1)'
            const result = await connection.query(sql, [email])
            const user = result.rows[0];

            if(user !== null){  // email/user exists
                const { password_digest: storedPassword, ...payload: userPayload } = user;
                return storedPassword
            }else{
                return null
            }
        } catch (err) {
            throw new Error(`Unable to get stored password: ${(err as Error).message}`);
        }
    }

    async checkEmailExists(email: string): Promise<boolean> {

        return true
    }

    async getUserStoredPassword(email: string): Promise<string | null> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT password_digest FROM users WHERE email=($1)'
            const result = await connection.query(sql, [email])
            if(result.rows[0].length){
                const { password_digest: storedPassword } = result.rows[0];
                return storedPassword
            }else{
                return null
            }
        } catch (err) {
            throw new Error(`Unable to get stored password: ${(err as Error).message}`);
        }
    }

}

