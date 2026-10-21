import type { Accent } from '../content/sections'
import type { FlowerVariant } from '../content/flowerPlacements'
import styles from './Flower.module.css'

const toneClass: Record<Accent | 'cream', string> = {
  burgundy: styles.burgundy,
  orange: styles.orange,
  pink: styles.pink,
  blue: styles.blue,
  sage: styles.sage,
  cream: styles.cream,
}

export function Flower({ variant, tone }: { variant: FlowerVariant; tone: Accent | 'cream' }) {
  return (
    <svg className={`${styles.flower} ${toneClass[tone]}`} viewBox="0 0 100 100" aria-hidden="true">
      {variant === 'peony' && <Peony />}
      {variant === 'wildrose' && <WildRose />}
      {variant === 'sprig' && <Sprig />}
      {variant === 'bud' && <Bud />}
    </svg>
  )
}

function Peony() {
  return (
    <>
      <circle cx="50" cy="48" r="22" fill="currentColor" opacity="0.12" />
      {[0, 45, 90, 135].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="48"
          rx="14"
          ry="20"
          fill="currentColor"
          opacity="0.55"
          transform={`rotate(${deg} 50 48)`}
        />
      ))}
      {[22, 67, 112, 157].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="48"
          rx="10"
          ry="16"
          fill="currentColor"
          opacity="0.75"
          transform={`rotate(${deg} 50 48)`}
        />
      ))}
      <circle cx="50" cy="48" r="7" fill="currentColor" opacity="0.85" />
    </>
  )
}

function WildRose() {
  return (
    <>
      <path d="M50 78 V58" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <path d="M42 66 C38 62 36 56 40 52" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.45" />
      <path d="M58 70 C62 66 64 60 60 56" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.45" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          d="M50 44 C46 34 54 28 50 22 C46 28 54 34 50 44Z"
          fill="currentColor"
          opacity="0.7"
          transform={`rotate(${deg} 50 44)`}
        />
      ))}
      <circle cx="50" cy="44" r="5" fill="currentColor" />
    </>
  )
}

function Sprig() {
  return (
    <>
      <path d="M50 82 V28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      <path d="M50 52 C38 46 32 36 38 28 C44 36 48 46 50 52Z" fill="currentColor" opacity="0.65" />
      <path d="M50 52 C62 46 68 36 62 28 C56 36 52 46 50 52Z" fill="currentColor" opacity="0.65" />
      <path d="M50 66 C40 62 34 54 38 46 C44 54 48 62 50 66Z" fill="currentColor" opacity="0.5" />
      <path d="M50 66 C60 62 66 54 62 46 C56 54 52 62 50 66Z" fill="currentColor" opacity="0.5" />
    </>
  )
}

function Bud() {
  return (
    <>
      <path d="M50 78 V46" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <path d="M50 46 C42 40 40 30 46 24 C50 30 50 38 50 46 C50 38 50 30 54 24 C60 30 58 40 50 46Z" fill="currentColor" opacity="0.72" />
      <path d="M44 50 C40 46 40 40 44 36" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
    </>
  )
}
