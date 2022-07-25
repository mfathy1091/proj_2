
import pool from '../config/database';
import User  from '../types/user'
import * as hashingService from '../utils/hashing' 
import jwt from 'jsonwebtoken'

let pepper = process.env.BCRYPT_PASSWORD

export default class AuthService {
    
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

    createToken(user: User, ): string{
        const token = jwt.sign({user}, process.env.TOKEN_SECRET as unknown as string);
        return token;
    }

    verifyToken(token: string){
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
        } catch (error) {
            return error
        }    
    }


}

