import express from 'express'
import { configMongoose, configRoutes } from './config'
import cors from 'cors'

const application = express()

application.use(express.json())
application.use(cors({ origin: "*"}))

configRoutes(application)


export const startServer = async () => {
    await configMongoose()
    
    const hostname = "localhost"
    const port = 5000
    
    application.listen(port, () => {
        console.log(`listening on ${hostname}:${port}`)
    })
}




