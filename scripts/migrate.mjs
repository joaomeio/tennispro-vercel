// ─────────────────────────────────────────────────────────────────────────────
// Run a .sql migration against the Supabase Postgres database.
//
//   node scripts/migrate.mjs scripts/002_drill_content.sql --dry-run
//   node scripts/migrate.mjs scripts/002_drill_content.sql
//
// The Supabase JS client cannot run DDL — it goes through PostgREST, which only
// does row operations. ALTER TABLE / CREATE INDEX need a real Postgres
// connection, so this uses DATABASE_URL rather than the service role key.
//
// Find the connection string in Supabase:
//   Project Settings → Database → Connection string → URI
// Use the SESSION pooler (port 5432) or the direct connection, NOT the
// transaction pooler on 6543 — that one rejects some DDL and prepared
// statements.
//
// Put it in .env.local as:
//   DATABASE_URL=postgresql://postgres.<ref>:<password>@<host>:5432/postgres
//
// The whole file runs inside a single transaction: if any statement fails,
// nothing is applied.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'
import pg from 'pg'

const file = process.argv[2]
const DRY_RUN = process.argv.includes('--dry-run')

if (!file) {
  console.error('Usage: node scripts/migrate.mjs <file.sql> [--dry-run]')
  process.exit(1)
}

const sqlPath = path.resolve(process.cwd(), file)
if (!fs.existsSync(sqlPath)) {
  console.error(`No such file: ${file}`)
  process.exit(1)
}

const sql = fs.readFileSync(sqlPath, 'utf-8')

// ── Summarise what the file will do, before doing it ────────────────────────

const statements = sql
  .split('\n')
  .filter((l) => /^\s*(ALTER|CREATE|DROP|INSERT|UPDATE|DELETE|COMMENT)\b/i.test(l))
  .map((l) => l.trim().replace(/\s+/g, ' ').slice(0, 96))

console.log(`${path.basename(sqlPath)} — ${statements.length} statement(s):\n`)
for (const s of statements) console.log(`  ${s}`)

const destructive = statements.filter((s) => /^\s*(DROP\s+TABLE|DELETE|TRUNCATE)/i.test(s))
if (destructive.length) {
  console.log(`\n  ${destructive.length} potentially destructive statement(s) above.`)
}

if (DRY_RUN) {
  console.log('\n--dry-run: nothing sent to the database.')
  process.exit(0)
}

// ── Connect ─────────────────────────────────────────────────────────────────

function loadEnv() {
  const f = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(f)) return {}
  const env = {}
  for (const line of fs.readFileSync(f, 'utf-8').split('\n')) {
    const m = line.match(/^([^=#]+)=(.*)$/)
    if (m) env[m[1].trim()] = m[2].trim().replace(/^["'](.*)["']$/, '$1')
  }
  return env
}

const env = { ...loadEnv(), ...process.env }
const url = env.DATABASE_URL

if (!url) {
  console.error('\nMissing DATABASE_URL in .env.local — see the header of this file.')
  process.exit(1)
}

if (/:6543\//.test(url)) {
  console.error('\nDATABASE_URL points at the transaction pooler (port 6543).')
  console.error('Use the session pooler or direct connection on port 5432 for DDL.')
  process.exit(1)
}

// TLS is verified against the system trust store. Supabase serves a
// publicly-issued certificate, so this works without extra configuration.
// If it ever fails, download the project CA from
//   Project Settings → Database → SSL configuration
// and point PGSSLROOTCERT at it — do not turn verification off, or the
// credentials in DATABASE_URL become interceptable.
const client = new pg.Client({
  connectionString: url,
  ssl: { rejectUnauthorized: true },
})

try {
  await client.connect()
  const { rows } = await client.query('select current_database() db, current_user usr')
  console.log(`\nConnected to ${rows[0].db} as ${rows[0].usr}`)

  // One transaction for the whole file — a partial migration is worse than none.
  await client.query('BEGIN')
  await client.query(sql)
  await client.query('COMMIT')

  console.log('Migration applied and committed.')
} catch (err) {
  try {
    await client.query('ROLLBACK')
    console.error('\nFailed — rolled back, nothing was applied.')
  } catch {
    console.error('\nFailed, and rollback also failed.')
  }
  console.error(`  ${err.message}`)
  process.exitCode = 1
} finally {
  await client.end().catch(() => {})
}
