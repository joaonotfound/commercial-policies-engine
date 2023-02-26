import { defineEventHandler } from 'h3'
import { makeLoginController, adaptHttp } from '@/main'

const loginController = makeLoginController()

export default defineEventHandler(adaptHttp(loginController))
