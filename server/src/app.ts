import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { errorHandler } from './middleware/error-handler.js'
import { notFoundHandler } from './middleware/not-found.js'
import { apiRouter } from './routes/index.js'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(cors({ origin: env.CORS_ORIGIN }))
  app.use(express.json({ limit: '1mb' }))

  app.use('/api', apiRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
