import { useId } from 'react'
import { couple } from '../content/wedding'

// A wax seal: slightly irregular edge, pressed ring, monogram.
const edge = (() => {
  const points = 72
  let d = ''
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2
    const r = 46 + 1.6 * Math.sin(i * 1.7) + 1.1 * Math.sin(i * 3.3 + 1) + (i % 9 === 0 ? 1.8 : 0)
    d += `${i ? 'L' : 'M'}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`
  }
  return `${d}Z`
})()

export function Seal({ size = 80, className }: { size?: number; className?: string }) {
  const id = useId()
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-wax`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#9a3346" />
          <stop offset="55%" stopColor="#6b1e2e" />
          <stop offset="100%" stopColor="#4a1320" />
        </radialGradient>
      </defs>
      <path d={edge} fill={`url(#${id}-wax)`} />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#4a1320" strokeWidth="2.4" opacity="0.7" />
      <circle cx="50" cy="50" r="31.5" fill="none" stroke="#c86b78" strokeWidth="0.8" opacity="0.45" />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontFamily="'Pinyon Script', cursive"
        fontSize="29"
        fill="#f3d6cc"
        opacity="0.92"
      >
        {couple.initials[0]}&amp;{couple.initials[1]}
      </text>
      <ellipse cx="36" cy="28" rx="12" ry="6" fill="#fff" opacity="0.12" transform="rotate(-30 36 28)" />
    </svg>
  )
}
