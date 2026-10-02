import pg, { type QueryResultRow } from 'pg'
import { env } from '../config/env.js'

const { Pool, types } = pg

// Return Postgres values in the shapes the API sends.
types.setTypeParser(types.builtins.NUMERIC, (value) => Number.parseFloat(value))
types.setTypeParser(types.builtins.INT8, (value) => Number.parseInt(value, 10))
types.setTypeParser(types.builtins.DATE, (value) => value) // keep 'YYYY-MM-DD'
types.setTypeParser(types.builtins.TIMESTAMPTZ, (value) => new Date(value).toISOString())

export const pool = new Pool({ connectionString: env.DATABASE_URL })

pool.on('error', (error) => console.error('Unexpected Postgres pool error:', error))

/** Runs one parameterized SQL statement. Values always go in `params`, never in `text`. */
export const query = <Row extends QueryResultRow>(text: string, params: unknown[] = []) =>
  pool.query<Row>(text, params)
