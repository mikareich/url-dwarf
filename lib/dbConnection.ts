import _mongoose, { connect } from 'mongoose'

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null
    conn: typeof _mongoose | null
  }
}

const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env

const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@dwarf.gaf2loj.mongodb.net/?retryWrites=true&w=majority`

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
