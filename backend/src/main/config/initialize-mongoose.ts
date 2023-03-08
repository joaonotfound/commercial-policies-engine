import mongoose from 'mongoose'


export const configMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? 'mongodb://root:password@localhost:27017')
    console.log('DB connection established.')
  } catch (err) {
    console.error('DB connection failed.', err)
  }
}
