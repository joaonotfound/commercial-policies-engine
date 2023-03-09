import { Controller } from "@/presentation"
import { Express, Router, Request, Response } from "express"
import { makeLoginController, makeSignupController } from "../factories"


const adaptRoute = (controller: Controller) => {
    return async (request: Request, expressResponse: Response) => {
        console.log(request.body)
        const response = await controller.handle(request.body)
        console.log(response)
        expressResponse.status(response.status).send(response.body)        
    }
}

export const configRoutes = (app: Express) => {
    const router = Router({strict: true})
    app.use('/api', router)

    router.post('/signup', adaptRoute(makeSignupController()))
    router.post('/logon', adaptRoute(makeLoginController()))
}