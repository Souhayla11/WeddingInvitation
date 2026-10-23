import type { Accent } from './sections'

export type DecorZone = 'hero' | 'footer' | 'details' | 'schedule' | 'recovery' | 'stay' | 'faq' | 'rsvp'

/** Crop focus within design1.jpeg — used only for footer background framing */
export type Design1Focus = 'cake' | 'table' | 'floral' | 'wash'

export type WatercolorKind = 'peony' | 'daisy' | 'spray' | 'vine' | 'sketchRose' | 'sketchSprig' | 'sketchBloom'

interface BaseMark {
  top?: string
  bottom?: string
  left?: string
  right?: string
  rotate: number
  scale?: number
  opacity?: number
}

export interface Design1Mark extends BaseMark {
  kind: 'design1'
  focus: Design1Focus
  size: string
}

export interface WatercolorMark extends BaseMark {
  kind: 'watercolor'
  variant: WatercolorKind
  tone: Accent | 'cream' | 'blush'
}

export type DecorMark = Design1Mark | WatercolorMark

const focusPosition: Record<Design1Focus, string> = {
  cake: '22% 78%',
  table: '48% 88%',
  floral: '72% 52%',
  wash: '28% 22%',
}

export function design1ObjectPosition(focus: Design1Focus) {
  return focusPosition[focus]
}

/** Watercolor + sketched accents per section; design1 appears only as the footer background (Footer.module.css) */
export const templateDecor: Record<DecorZone, DecorMark[]> = {
  hero: [],
  details: [
    { kind: 'watercolor', variant: 'spray', tone: 'pink', top: '18%', left: '3%', rotate: -16, scale: 1, opacity: 0.48 },
    { kind: 'watercolor', variant: 'peony', tone: 'burgundy', bottom: '14%', right: '4%', rotate: 10, scale: 0.9, opacity: 0.42 },
    { kind: 'watercolor', variant: 'sketchRose', tone: 'burgundy', top: '8%', right: '6%', rotate: 12, scale: 1.1, opacity: 0.7 },
    { kind: 'watercolor', variant: 'sketchSprig', tone: 'sage', bottom: '30%', left: '2%', rotate: -8, scale: 1, opacity: 0.6 },
  ],
  schedule: [
    { kind: 'watercolor', variant: 'daisy', tone: 'orange', top: '12%', right: '5%', rotate: 12, scale: 0.92, opacity: 0.44 },
    { kind: 'watercolor', variant: 'vine', tone: 'sage', bottom: '20%', left: '4%', rotate: 22, scale: 0.88, opacity: 0.38 },
    { kind: 'watercolor', variant: 'sketchBloom', tone: 'orange', top: '10%', left: '5%', rotate: -14, scale: 1, opacity: 0.65 },
    { kind: 'watercolor', variant: 'sketchSprig', tone: 'sage', bottom: '12%', right: '4%', rotate: 160, scale: 0.95, opacity: 0.55 },
  ],
  recovery: [
    { kind: 'watercolor', variant: 'peony', tone: 'pink', top: '10%', right: '3%', rotate: -14, scale: 1, opacity: 0.5 },
    { kind: 'watercolor', variant: 'spray', tone: 'blush', bottom: '16%', right: '6%', rotate: 18, scale: 0.95, opacity: 0.42 },
    { kind: 'watercolor', variant: 'daisy', tone: 'burgundy', bottom: '8%', left: '5%', rotate: -8, scale: 0.8, opacity: 0.36 },
    { kind: 'watercolor', variant: 'sketchRose', tone: 'pink', top: '14%', left: '3%', rotate: -10, scale: 1, opacity: 0.65 },
  ],
  stay: [
    { kind: 'watercolor', variant: 'vine', tone: 'blue', top: '20%', left: '2%', rotate: -20, scale: 1, opacity: 0.4 },
    { kind: 'watercolor', variant: 'daisy', tone: 'sage', bottom: '18%', right: '4%', rotate: 8, scale: 0.86, opacity: 0.38 },
    { kind: 'watercolor', variant: 'sketchBloom', tone: 'blue', top: '8%', right: '5%', rotate: 10, scale: 1, opacity: 0.6 },
    { kind: 'watercolor', variant: 'sketchSprig', tone: 'sage', bottom: '8%', left: '6%', rotate: 12, scale: 0.9, opacity: 0.55 },
  ],
  faq: [
    { kind: 'watercolor', variant: 'spray', tone: 'sage', top: '14%', left: '4%', rotate: 16, scale: 0.9, opacity: 0.45 },
    { kind: 'watercolor', variant: 'peony', tone: 'orange', bottom: '12%', left: '2%', rotate: -12, scale: 0.82, opacity: 0.38 },
    { kind: 'watercolor', variant: 'sketchRose', tone: 'sage', top: '10%', right: '4%', rotate: 8, scale: 1, opacity: 0.65 },
    { kind: 'watercolor', variant: 'sketchBloom', tone: 'pink', bottom: '22%', right: '5%', rotate: -16, scale: 0.9, opacity: 0.6 },
  ],
  rsvp: [
    { kind: 'watercolor', variant: 'daisy', tone: 'cream', top: '12%', left: '3%', rotate: -18, scale: 0.75, opacity: 0.35 },
    { kind: 'watercolor', variant: 'vine', tone: 'pink', bottom: '10%', right: '5%', rotate: 14, scale: 0.85, opacity: 0.32 },
    { kind: 'watercolor', variant: 'sketchSprig', tone: 'cream', top: '8%', right: '4%', rotate: 20, scale: 1, opacity: 0.45 },
  ],
  footer: [
    { kind: 'watercolor', variant: 'spray', tone: 'burgundy', top: '46%', right: '22%', rotate: 12, scale: 0.88, opacity: 0.35 },
    { kind: 'watercolor', variant: 'peony', tone: 'sage', top: '20%', right: '9%', rotate: -10, scale: 0.8, opacity: 0.32 },
    { kind: 'watercolor', variant: 'sketchRose', tone: 'burgundy', bottom: '14%', right: '14%', rotate: -6, scale: 0.9, opacity: 0.6 },
  ],
}
