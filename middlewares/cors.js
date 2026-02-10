import cors from 'cors'

const ACCEPTED_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      console.log('CORS origin:', origin) // 👈 DEBUG

      if (!origin) return callback(null, true)

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  })
