import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import router from './routes/index';
import ErrorHandler from './middlewares/ErrorHandler'

const app: express.Application = express()
const address: string = "127.0.0.1:"+ process.env.NODE_PORT

app.use(express.json())
app.use(express.urlencoded());

console.log('hi')

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
app.use(morgan("common"))

app.use('/api', router);

import Error from './interfaces/Error'

app.use((_req: Request, res: Response, next: NextFunction) => {
    const error: Error = {
        status: 404,
        message: 'Not found'
    }
    next(error)
})

app.use(ErrorHandler);



app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app