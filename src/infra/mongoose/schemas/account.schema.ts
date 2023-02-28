import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String }
  },
  { timestamps: true, strict: true, strictQuery: true }
)

export const accountSchema =
  mongoose.models.Account || mongoose.model('Account', schema, 'users')
