import { defineEventHandler } from 'h3'
import { adaptHttp, makeSignupController } from '../../main'

const controller = makeSignupController()

export default defineEventHandler(adaptHttp(controller))
