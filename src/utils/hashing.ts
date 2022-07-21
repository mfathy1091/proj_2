
import bcrypt from 'bcrypt'


const encryptPassword = async (password: string): Promise<string> => {
    let saltRounds = process.env.SALT_ROUND
    let pepper = process.env.BCRYPT_PASSWORD
    
    const encryptedPassword = bcrypt.hashSync(
        password + pepper,
        parseInt(saltRounds as string)
    );

    return encryptedPassword;
}


export { encryptPassword }