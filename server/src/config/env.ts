const port = Number(process.env.PORT ?? 4000)
if (!Number.isInteger(port) || port <= 0) throw new Error('PORT must be a positive integer')

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: port,
  DATABASE_URL: process.env.DATABASE_URL ?? 'postgres://localhost:5432/beta_crm',
  CORS_ORIGIN: (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
}

export const isProduction = env.NODE_ENV === 'production'
