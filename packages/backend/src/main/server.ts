import express, { json } from 'express'
import cors from 'cors'
import { configMongoose, configRoutes } from './config'

const application = express()

application.use(json())
application.use(cors({ origin: '*' }))

configRoutes(application)

export const startServer = async () => {
  await configMongoose()

  const hostname = 'localhost'
  const port = 5000

  application.listen(port, () => {
    console.log(`listening on ${hostname}:${port}`)
  })
}
