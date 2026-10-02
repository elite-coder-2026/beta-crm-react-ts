import type { ErrorRequestHandler } from 'express'
import pg from 'pg'
import { isProduction } from '../config/env.js'
import { HttpError } from '../lib/http-error.js'

/** Postgres error codes → HTTP. https://www.postgresql.org/docs/current/errcodes-appendix.html */
function fromDatabaseError(error: pg.DatabaseError) {
  const details = { constraint: error.constraint, column: error.column, detail: error.detail }
  switch (error.code) {
    case '23505': // unique_violation
      return { status: 409, message: 'A record with that value already exists', details }
    case '23503': // foreign_key_violation
      return error.detail?.includes('still referenced')
        ? { status: 409, message: 'This record is still used by other records', details }
        : { status: 400, message: 'A referenced record does not exist', details }
    case '23502': // not_null_violation
      return { status: 400, message: `${error.column} is required`, details }
    case '23514': // check_violation
      return { status: 400, message: `Value breaks rule ${error.constraint}`, details }
    case '22P02': // invalid_text_representation
    case '22007': // invalid_datetime_format
    case '22008': // datetime_field_overflow
    case '22003': // numeric_value_out_of_range
      return { status: 400, message: error.message, details }
    default:
      return null
  }
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ error: { message: error.message, details: error.details } })
    return
  }

  if (error instanceof pg.DatabaseError) {
    const mapped = fromDatabaseError(error)
    if (mapped) {
      res.status(mapped.status).json({ error: { message: mapped.message, details: mapped.details } })
      return
    }
  }

  // Express/body-parser errors (e.g. malformed JSON) carry their own 4xx status.
  const status: unknown = error?.status ?? error?.statusCode
  if (typeof status === 'number' && status >= 400 && status < 500) {
    res.status(status).json({ error: { message: error.expose ? error.message : 'Bad request' } })
    return
  }

  console.error(error)
  res.status(500).json({
    error: {
      message: 'Internal server error',
      ...(isProduction ? {} : { details: error instanceof Error ? error.message : String(error) }),
    },
  })
}
