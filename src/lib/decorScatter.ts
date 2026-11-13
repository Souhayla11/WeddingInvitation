import type { DecorMark, DecorZone } from '../content/templateDecor'

function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), seed | 1)
    t = (t + Math.imul(t ^ (t >>> 7), t | 61)) | 0
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle(count: number, rng: () => number): number[] {
  const slots = Array.from({ length: count }, (_, i) => i)
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[slots[i], slots[j]] = [slots[j], slots[i]]
  }
  return slots
}

type Position = Pick<DecorMark, 'top' | 'bottom' | 'left' | 'right'>

/** Eight edge/margin anchors so florals are not locked to the four corners. */
function anchorPosition(slot: number, rng: () => number): Position {
  const v = () => `${(5 + rng() * 28).toFixed(1)}%`
  const h = () => `${(rng() * 11).toFixed(1)}%`
  const midV = () => `${(28 + rng() * 32).toFixed(1)}%`

  switch (slot % 8) {
    case 0:
      return { top: v(), left: h() }
    case 1:
      return { top: v(), right: h() }
    case 2:
      return { bottom: v(), left: h() }
    case 3:
      return { bottom: v(), right: h() }
    case 4:
      return { top: midV(), left: h() }
    case 5:
      return { top: midV(), right: h() }
    case 6:
      return { bottom: v(), left: `${(4 + rng() * 8).toFixed(1)}%` }
    default:
      return { top: v(), right: `${(5 + rng() * 7).toFixed(1)}%` }
  }
}

/** Deterministic scatter per section — varied on each zone, stable on refresh. */
export function scatterDecorMarks(zone: DecorZone, marks: DecorMark[]): DecorMark[] {
  const zoneRng = mulberry32(hashString(`decor-${zone}`))
  const watercolorIndexes = marks.map((m, i) => (m.kind === 'watercolor' ? i : -1)).filter((i) => i >= 0)
  const slotOrder = shuffle(watercolorIndexes.length, zoneRng)

  let watercolorIndex = 0

  return marks.map((mark, i) => {
    if (mark.kind !== 'watercolor') return mark

    const itemRng = mulberry32(hashString(`${zone}-${mark.variant}-${i}`))
    const slot = slotOrder[watercolorIndex++] ?? 0
    const position = anchorPosition(slot, itemRng)

    const rotate = Math.round(-34 + itemRng() * 68)
    const scale = Math.round((0.68 + itemRng() * 0.5) * 100) / 100
    const opacity = Math.round((0.26 + itemRng() * 0.44) * 100) / 100

    const { top: _t, bottom: _b, left: _l, right: _r, ...rest } = mark
    return { ...rest, ...position, rotate, scale, opacity }
  })
}

export function decorRevealDelay(zone: DecorZone, index: number): number {
  const rng = mulberry32(hashString(`${zone}-delay-${index}`))
  return Math.round((0.04 + rng() * 0.38) * 100) / 100
}
