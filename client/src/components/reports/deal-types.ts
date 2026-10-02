export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'

/** The funnel, in order. A won deal has passed through every stage. */
export const funnelStages: { id: Exclude<DealStage, 'lost'>; label: string }[] = [
  { id: 'lead', label: 'Lead' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'won', label: 'Won' },
]

export const dealSources = ['Website', 'Referral', 'Outbound', 'Events', 'Partners'] as const
export type DealSource = (typeof dealSources)[number]

export interface Deal {
  id: number
  company: string
  ownerId: number
  source: DealSource
  value: number
  stage: DealStage
  /** For lost deals: the furthest funnel stage reached (index into funnelStages). */
  lostAtStage?: number
  createdAt: Date
  closedAt: Date | null
}
