import type { Accent } from './sections'

export type FlowerVariant = 'peony' | 'wildrose' | 'sprig' | 'bud'
export type FlowerZone = 'hero' | 'footer' | 'details' | 'schedule' | 'recovery' | 'stay' | 'faq' | 'rsvp'

export interface FlowerPlacement {
  variant: FlowerVariant
  tone: Accent | 'cream'
  /** Percent or rem strings */
  top?: string
  bottom?: string
  left?: string
  right?: string
  rotate: number
  scale?: number
  opacity?: number
}

/** Hand-placed “random” clusters per page area — stable on every visit. */
export const flowerPlacements: Record<FlowerZone, FlowerPlacement[]> = {
  hero: [
    { variant: 'wildrose', tone: 'cream', top: '11%', right: '5%', rotate: 18, scale: 1.05, opacity: 0.55 },
    { variant: 'sprig', tone: 'cream', bottom: '16%', left: '4%', rotate: -22, scale: 0.95, opacity: 0.45 },
    { variant: 'bud', tone: 'cream', top: '38%', left: '7%', rotate: 12, scale: 0.75, opacity: 0.35 },
  ],
  details: [
    { variant: 'peony', tone: 'burgundy', top: '8%', left: '2%', rotate: -14, scale: 1, opacity: 0.32 },
    { variant: 'sprig', tone: 'sage', bottom: '12%', right: '3%', rotate: 24, scale: 0.9, opacity: 0.28 },
    { variant: 'bud', tone: 'pink', top: '42%', right: '6%', rotate: -8, scale: 0.7, opacity: 0.22 },
  ],
  schedule: [
    { variant: 'wildrose', tone: 'orange', top: '14%', right: '2%', rotate: 10, scale: 0.92, opacity: 0.3 },
    { variant: 'peony', tone: 'pink', bottom: '18%', left: '3%', rotate: -18, scale: 0.85, opacity: 0.26 },
  ],
  recovery: [
    { variant: 'peony', tone: 'pink', top: '6%', left: '4%', rotate: 16, scale: 0.95, opacity: 0.34 },
    { variant: 'wildrose', tone: 'burgundy', bottom: '10%', right: '5%', rotate: -12, scale: 0.88, opacity: 0.28 },
    { variant: 'sprig', tone: 'sage', top: '55%', right: '2%', rotate: 20, scale: 0.8, opacity: 0.24 },
  ],
  stay: [
    { variant: 'sprig', tone: 'blue', top: '10%', right: '4%', rotate: -16, scale: 1, opacity: 0.3 },
    { variant: 'bud', tone: 'sage', bottom: '22%', left: '2%', rotate: 8, scale: 0.75, opacity: 0.26 },
    { variant: 'wildrose', tone: 'blue', top: '48%', left: '5%', rotate: -20, scale: 0.82, opacity: 0.22 },
  ],
  faq: [
    { variant: 'wildrose', tone: 'sage', top: '16%', left: '2%', rotate: -10, scale: 0.9, opacity: 0.3 },
    { variant: 'peony', tone: 'orange', bottom: '14%', right: '4%', rotate: 14, scale: 0.78, opacity: 0.25 },
  ],
  rsvp: [
    { variant: 'sprig', tone: 'cream', top: '9%', left: '3%', rotate: 22, scale: 0.95, opacity: 0.2 },
    { variant: 'wildrose', tone: 'pink', bottom: '11%', right: '4%', rotate: -16, scale: 0.88, opacity: 0.18 },
  ],
  footer: [
    { variant: 'bud', tone: 'burgundy', top: '18%', left: '8%', rotate: -6, scale: 0.85, opacity: 0.28 },
    { variant: 'sprig', tone: 'sage', top: '22%', right: '7%', rotate: 12, scale: 0.9, opacity: 0.26 },
  ],
}
