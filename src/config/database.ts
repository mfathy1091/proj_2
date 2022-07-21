import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    NODE_ENV,
} = process.env

let pool
console.log('NODE_ENV:' + NODE_ENV)

if (NODE_ENV === 'test') {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

if (NODE_ENV === 'dev') {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

export default pool