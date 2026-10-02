import { dealSources, type Deal, type DealSource, type DealStage } from '../components/reports/deal-types'

/** Small seeded PRNG so the sample data is the same on every load. */
const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5)
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const companies = [
  'Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Stark Industries', 'Wayne Enterprises',
  'Wonka Industries', 'Soylent', 'Cyberdyne', 'Tyrell Corp', 'Massive Dynamic', 'Vandelay',
  'Pied Piper', 'Aperture', 'Oscorp', 'Gringotts', 'Monarch', 'Dunder Mifflin', 'Bluth Co',
  'Prestige Worldwide', 'Sterling Cooper', 'Nakatomi', 'Virtucon', 'Wernham Hogg', 'Krusty Krab',
  'Los Pollos', 'Paper Street', 'Gekko & Co', 'Ollivanders',
]

const sourceWeights: Record<DealSource, number> = {
  Website: 0.32,
  Referral: 0.22,
  Outbound: 0.2,
  Events: 0.16,
  Partners: 0.1,
}

const DAY = 24 * 60 * 60 * 1000
const MONTHS = 24
const OWNER_IDS = [1, 2, 3, 4]
/** Some reps close more often than others, so the rep charts have a story. */
const ownerWinBoost: Record<number, number> = { 1: 0.02, 2: 0.12, 3: -0.06, 4: 0 }

function generateDeals(now = new Date()): Deal[] {
  const random = mulberry32(2026)
  const pick = <T,>(items: readonly T[]) => items[Math.floor(random() * items.length)]
  const pickSource = (): DealSource => {
    let roll = random()
    for (const source of dealSources) {
      roll -= sourceWeights[source]
      if (roll <= 0) return source
    }
    return 'Website'
  }

  const deals: Deal[] = []
  let id = 1

  for (let monthsAgo = MONTHS - 1; monthsAgo >= 0; monthsAgo--) {
    const count = 9 + Math.round((MONTHS - monthsAgo) * 0.55) + Math.floor(random() * 6)
    const isCurrentMonth = monthsAgo === 0

    for (let i = 0; i < count; i++) {
      const maxDay = isCurrentMonth ? now.getDate() : 28
      const day = 1 + Math.floor(random() * maxDay)
      const createdAt = new Date(now.getFullYear(), now.getMonth() - monthsAgo, day)
      const ageDays = (now.getTime() - createdAt.getTime()) / DAY

      const ownerId = pick(OWNER_IDS)
      const source = pickSource()
      const base = 2000 + random() * random() * 38000
      const value = Math.round((source === 'Referral' ? base * 1.3 : base) / 100) * 100

      const winChance = 0.36 + ownerWinBoost[ownerId] + (source === 'Referral' ? 0.08 : 0)
      const roll = random()
      let stage: DealStage
      let lostAtStage: number | undefined

      if (ageDays > 45) {
        stage = roll < winChance ? 'won' : 'lost'
      } else if (ageDays > 14) {
        stage = roll < winChance * 0.5 ? 'won' : roll < 0.45 ? 'lost' : pick(['qualified', 'proposal', 'negotiation'] as const)
      } else {
        stage = ageDays < 5 ? 'lead' : pick(['lead', 'qualified', 'qualified', 'proposal'] as const)
      }

      if (stage === 'lost') lostAtStage = Math.floor(random() * 4)

      let closedAt: Date | null = null
      if (stage === 'won' || stage === 'lost') {
        const closeDays = 10 + Math.floor(random() * 40)
        closedAt = new Date(Math.min(createdAt.getTime() + closeDays * DAY, now.getTime()))
      }

      deals.push({
        id: id++,
        company: pick(companies),
        ownerId,
        source,
        value,
        stage,
        lostAtStage,
        createdAt,
        closedAt,
      })
    }
  }

  return deals
}

export const sampleDeals = generateDeals()
