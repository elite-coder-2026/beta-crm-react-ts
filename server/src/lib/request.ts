import { badRequest } from './http-error.js'

/** A positive integer `:id` route param. */
export function numericId(value: unknown) {
  const id = Number(value)
  if (!Number.isInteger(id) || id <= 0) throw badRequest('id must be a positive integer')
  return id
}

/** A text `:id` route param (e.g. a UUID; Postgres rejects malformed ones with a 400). */
export function textId(value: unknown) {
  if (typeof value !== 'string' || value.trim() === '') throw badRequest('id is required')
  return value
}

/**
 * Keeps only the allowed fields from a JSON body. Types and rules are enforced
 * by the database (NOT NULL, CHECK, UNIQUE, foreign keys); its errors become 400/409.
 */
export function pickFields(body: unknown, allowed: readonly string[], { requireOne = false } = {}) {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw badRequest('Send a JSON object')
  }

  const fields = Object.fromEntries(
    Object.entries(body).filter(([key, value]) => allowed.includes(key) && value !== undefined),
  )

  if (requireOne && Object.keys(fields).length === 0) {
    throw badRequest(`Send at least one of: ${allowed.join(', ')}`)
  }
  return fields
}
