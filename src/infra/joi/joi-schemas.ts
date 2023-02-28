import Joi from 'joi'
import { RegisterAccount } from '@/domain'

export const JoiRegisterAccountSchema = Joi.object<RegisterAccount>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  username: Joi.string().required(),
  password: Joi.string().required()
})
