import mongoose from 'mongoose'

declare const useRuntimeConfig: () => any

const config = useRuntimeConfig()
export default async () => {
  try {
    await mongoose.connect(config.mongoUrl)
    console.log('DB connection established.')
  } catch (err) {
    console.error('DB connection failed.', err)
  }
}
