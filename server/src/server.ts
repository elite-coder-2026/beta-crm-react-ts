import { createApp } from './app.js'
import { env } from './config/env.js'
import { pool } from './db/pool.js'

const server = createApp().listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}/api`)
})

const shutdown = () => {
  server.close(() => {
    pool.end().finally(() => process.exit(0))
  })
  setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
