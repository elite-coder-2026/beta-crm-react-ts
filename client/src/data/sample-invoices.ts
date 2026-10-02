import type { Invoice, InvoiceStatus } from '../components/invoices/invoice-types'
import { daysFromNowISO, todayISO } from '../utils/dates'

/** Small seeded PRNG so the sample data is the same on every load. */
const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5)
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const customers = [
  'Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Stark Industries', 'Wayne Enterprises',
  'Wonka Industries', 'Soylent', 'Cyberdyne', 'Tyrell Corp', 'Massive Dynamic', 'Vandelay',
  'Pied Piper', 'Aperture', 'Monarch', 'Dunder Mifflin', 'Bluth Co', 'Sterling Cooper',
  'Nakatomi', 'Virtucon', 'Paper Street', 'Gekko & Co', 'Ollivanders',
]

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')

const COUNT = 260
const HISTORY_DAYS = 420
const PAYMENT_TERMS = [15, 30, 30, 45]

function generateInvoices(): Invoice[] {
  const random = mulberry32(1042)
  const today = todayISO()

  const issueOffsets = Array.from({ length: COUNT }, () => -Math.floor(random() * HISTORY_DAYS)).sort(
    (a, b) => a - b,
  )

  return issueOffsets.map((offset, index) => {
    const customer = customers[Math.floor(random() * customers.length)]
    const issueDate = daysFromNowISO(offset)
    const dueDate = daysFromNowISO(offset + PAYMENT_TERMS[Math.floor(random() * PAYMENT_TERMS.length)])
    const amount = Math.round((400 + random() * random() * 24_000) * 100) / 100
    const ageDays = -offset
    const roll = random()

    let status: InvoiceStatus
    if (ageDays < 21 && roll < 0.3) {
      status = 'draft'
    } else if (roll < 0.04) {
      status = 'void'
    } else if (ageDays > 50 ? roll < 0.93 : roll < 0.45) {
      status = 'paid'
    } else {
      status = dueDate < today ? 'overdue' : 'sent'
    }

    const year = issueDate.slice(0, 4)
    return {
      id: index + 1,
      number: `INV-${year}-${String(index + 1).padStart(4, '0')}`,
      customer,
      email: `billing@${slug(customer)}.example.com`,
      amount,
      status,
      issueDate,
      dueDate,
    }
  })
}

export const sampleInvoices = generateInvoices()
