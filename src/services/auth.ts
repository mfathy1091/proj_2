
import pool from '../config/database';
import bcrypt from 'bcrypt'
import User  from '../types/user'
import * as hashingService from '../utils/hashing' 

// let saltRounds = process.env.SALT_ROUND
let pepper = process.env.BCRYPT_PASSWORD

export default class authQueries {
    
    async login(email: string, plainTextPassword: string): Promise<User | null> {
        const connection = await pool.connect();
        try {
            const sql = 'SELECT id, email, first_name, last_name, password FROM users WHERE email=($1)'
            const result = await connection.query(sql, [email])
            const user = result.rows[0];

            // if user exists
            if(user){ 
                const { password: hashedPassword } = user;
                
                // compare passwords
                const isPasswordValid = await hashingService.isPasswordValid(plainTextPassword, hashedPassword)
                
                if(isPasswordValid === true){
                    return user
                }else{
                    return null
                }
            }else{
                return null
            }
        } catch (err) {            
            throw new Error(`Unable to login: ${(err as Error).message}`);
        }finally{
            connection.release();
        }
        
    }




}

