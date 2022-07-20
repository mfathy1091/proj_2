
import bcrypt from 'bcrypt'


const hashPassword = async (password: string): Promise<string> => {
    let saltRounds = process.env.SALT_ROUND
    let pepper = process.env.BCRYPT_PASSWORD
    
    const hashedPassword = bcrypt.hashSync(
        password + pepper,
        parseInt(saltRounds as string)
    );

    return hashedPassword;
}


export { hashPassword }