import type { RequestHandler } from 'express'
import { notFound } from '../lib/http-error.js'

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(notFound(`No route for ${req.method} ${req.originalUrl}`))
}
