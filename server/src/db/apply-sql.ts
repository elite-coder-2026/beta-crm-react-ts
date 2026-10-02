import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { pool } from './pool.js'

/**
 * Runs every .sql file in src/<folder> in name order, in one transaction, with pg.
 *   npm run db:schema   → src/schemas (tables, triggers; safe to re-run)
 *   npm run db:seed     → src/seeds   (sample rows; safe to re-run)
 */
const folder = process.argv[2]
if (folder !== 'schemas' && folder !== 'seeds') {
  console.error('Usage: apply-sql.ts <schemas|seeds>')
  process.exit(1)
}

const directory = path.resolve(import.meta.dirname, '..', '..', 'src', folder)
const files = (await readdir(directory)).filter((name) => name.endsWith('.sql')).sort()
const client = await pool.connect()

try {
  await client.query('BEGIN')
  for (const file of files) {
    await client.query(await readFile(path.join(directory, file), 'utf8'))
    console.log(`Applied ${folder}/${file}`)
  }
  await client.query('COMMIT')
} catch (error) {
  await client.query('ROLLBACK')
  console.error(`Applying ${folder} failed:`, error)
  process.exitCode = 1
} finally {
  client.release()
  await pool.end()
}
