import { defineEventHandler } from 'h3'
import { adaptHttp } from '../helpers'
import { makeLoginController } from '../factories'

const loginController = makeLoginController()

export default defineEventHandler(adaptHttp(loginController))
