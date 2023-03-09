import { LoginController } from "@/presentation"
import { makeAuthentication } from "../usecases"

export const makeLoginController = () => {
    return new LoginController(makeAuthentication())
}