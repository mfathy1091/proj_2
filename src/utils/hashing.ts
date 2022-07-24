
import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUND
const pepper = process.env.BCRYPT_PASSWORD

const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(
        password + pepper,
        parseInt(saltRounds as string)
    );

    return hashedPassword;
}

const isPasswordValid = async (password: string, hash: string): Promise<boolean> => {
    const isPasswordValid = await bcrypt.compare( password+pepper, hash )
    return isPasswordValid
}


export { hashPassword, isPasswordValid}