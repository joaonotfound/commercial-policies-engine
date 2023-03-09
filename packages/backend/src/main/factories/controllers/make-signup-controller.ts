import { JoiValidateSchema, TokenRepository } from "@/infra"
import { SignupController } from "@/presentation"
import { makeDatabaseAddAccount } from "../usecases"

export const makeSignupController = () => {
    const accountSchemaValidator = new JoiValidateSchema()
    const tokenRepository = new TokenRepository()
    return new SignupController(accountSchemaValidator, makeDatabaseAddAccount(), tokenRepository)
}