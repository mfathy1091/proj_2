
import pool from '../config/database';
import bcrypt from 'bcrypt'
import User  from '../types/user'
import { json } from 'express';

// let saltRounds = process.env.SALT_ROUND
let pepper = process.env.BCRYPT_PASSWORD

export default class authQueries {
    
    async login(email: string, password: string): Promise<User | null> {
        const connection = await pool.connect();
        try {
            const sql = 'SELECT id, email, first_name, last_name, password_digest FROM users WHERE email=($1)'
            const result = await connection.query(sql, [email])
            const user = result.rows[0];

            // if user exists
            if(user){ 
                const { password_digest: encryptedPassworerd } = user;
                
                // compare passwords
                const isPasswordValid = bcrypt.compareSync( password+pepper, encryptedPassworerd )
                
                if(isPasswordValid){
                    return user
                }else{
                    throw new Error(`Invalid password`)
                }
            }else{
                throw new Error(`Invalid Email or Password`)
            }
        } catch (err) {
            
            console.log(err)
            throw new Error(`Unable to login: ${(err as Error).message}`);
        }finally{
            connection.release();
        }
        
    }




}

