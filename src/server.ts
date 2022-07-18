import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import router from './routes/index';
import ErrorMiddleware from './middlewares/ErrorMiddleware'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

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

app.use(ErrorMiddleware);



app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
