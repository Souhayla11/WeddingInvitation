import { useId } from 'react'
import type { Accent } from '../content/sections'
import type { WatercolorKind } from '../content/templateDecor'
import styles from './Flower.module.css'

type FlowerTone = Accent | 'cream' | 'blush'

const toneClass: Record<FlowerTone, string> = {
  burgundy: styles.burgundy,
  orange: styles.orange,
  pink: styles.pink,
  blue: styles.blue,
  sage: styles.sage,
  cream: styles.cream,
  blush: styles.blush,
}

/** Loose watercolor florals inspired by design1 / design2 */
export function WatercolorFlower({ variant, tone }: { variant: WatercolorKind; tone: FlowerTone }) {
  const filterId = useId()
  return (
    <svg className={`${styles.flower} ${toneClass[tone]}`} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${filterId})`} className={styles.wash}>
        {variant === 'peony' && <Peony />}
        {variant === 'daisy' && <Daisy />}
        {variant === 'spray' && <Spray />}
        {variant === 'vine' && <Vine />}
      </g>
      {variant === 'sketchRose' && <SketchRose />}
      {variant === 'sketchSprig' && <SketchSprig />}
      {variant === 'sketchBloom' && <SketchBloom />}
    </svg>
  )
}

/** Each line drawn twice, slightly offset, like a pen going over the shape again */
function Sketch({ d, width = 1.1 }: { d: string; width?: number }) {
  return (
    <>
      <path d={d} className={styles.line} strokeWidth={width} />
      <path d={d} className={styles.line} strokeWidth={width * 0.55} opacity="0.45" transform="translate(0.9 0.7)" />
    </>
  )
}

const leaf = 'M0 0 C6 -8 16 -9 22 -4 C16 2 6 3 0 0Z'

function SketchRose() {
  return (
    <>
      <ellipse cx="64" cy="47" rx="23" ry="18" className={styles.petalLight} opacity="0.5" />
      <path d="M38 88 C44 78 52 78 58 82 C50 90 44 92 38 88Z" className={styles.leaf} opacity="0.3" transform="translate(-3 2)" />
      <Sketch d="M60 30 C72 28 80 38 76 48 C72 58 56 60 48 52 C40 44 46 32 58 32" />
      <Sketch d="M60 38 C66 37 70 42 67 47 C64 52 56 51 55 46 C54 42 58 40 61 41" width={0.9} />
      <Sketch d="M44 40 C40 50 46 62 60 63 C74 64 84 54 82 42" />
      <Sketch d="M60 63 C60 78 58 92 56 106" width={1} />
      <Sketch d="M58 82 C46 76 38 80 34 88 C44 92 52 90 58 82Z" width={0.9} />
      <Sketch d="M59 94 C70 88 80 90 84 98 C74 103 65 101 59 94Z" width={0.9} />
      <path d="M58 82 L40 87 M59 94 L80 97" className={styles.line} strokeWidth="0.6" opacity="0.6" />
    </>
  )
}

const sprigLeaves: [number, number, number][] = [
  [38, 93, -125],
  [44, 85, -35],
  [50, 76, -130],
  [57, 67, -40],
  [63, 58, -135],
  [70, 49, -45],
  [76, 40, -140],
  [82, 31, -50],
]

function SketchSprig() {
  return (
    <>
      {sprigLeaves.map(([x, y, a]) => (
        <path
          key={`w${x}`}
          d={leaf}
          className={styles.leaf}
          opacity="0.32"
          transform={`translate(${x + 2} ${y + 2}) rotate(${a})`}
        />
      ))}
      <Sketch d="M30 104 C46 84 60 60 88 20" />
      {sprigLeaves.map(([x, y, a]) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${a})`}>
          <Sketch d={leaf} width={0.85} />
          <path d="M1 0 L18 -3" className={styles.line} strokeWidth="0.5" opacity="0.5" />
        </g>
      ))}
    </>
  )
}

function SketchBloom() {
  const petal = 'M60 50 C54 38 56 26 60 20 C64 26 66 38 60 50Z'
  return (
    <>
      <circle cx="63" cy="52" r="26" className={styles.petalLight} opacity="0.4" />
      <ellipse cx="82" cy="70" rx="5" ry="7" className={styles.petalDeep} opacity="0.25" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 60 50)`}>
          <Sketch d={petal} width={0.9} />
        </g>
      ))}
      <circle cx="60" cy="50" r="5" className={styles.line} strokeWidth="1" />
      {[
        [58, 48],
        [62, 49],
        [60, 52],
      ].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="0.8" className={styles.dot} />
      ))}
      <Sketch d="M60 56 C62 76 60 92 62 106" width={1} />
      <Sketch d="M61 84 C68 78 74 76 79 72" width={0.8} />
      <Sketch d="M79 72 C76 66 78 62 81 61 C85 62 86 67 83 72 C82 73 80 73 79 72Z" width={0.8} />
    </>
  )
}

function Peony() {
  return (
    <>
      <g className={styles.petalDeep} opacity="0.55">
        {[0, 51, 102, 153].map((deg) => (
          <ellipse key={deg} cx="60" cy="52" rx="16" ry="24" transform={`rotate(${deg} 60 52)`} />
        ))}
      </g>
      <g className={styles.petalLight} opacity="0.45">
        {[25, 77, 128, 180, 230, 282].map((deg) => (
          <ellipse key={deg} cx="60" cy="52" rx="11" ry="18" transform={`rotate(${deg} 60 52)`} />
        ))}
      </g>
      <circle cx="60" cy="52" r="8" className={styles.petalDeep} opacity="0.65" />
      <path
        d="M60 76 C54 70 52 62 58 56 M60 76 C66 70 68 62 62 56"
        className={styles.sketch}
        fill="none"
        strokeWidth="1.2"
      />
    </>
  )
}

function Daisy() {
  return (
    <>
      <path d="M60 82 V58" className={styles.sketch} fill="none" strokeWidth="1.1" />
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg) => (
        <ellipse
          key={deg}
          cx="60"
          cy="44"
          rx="7"
          ry="16"
          className={styles.petalLight}
          opacity="0.6"
          transform={`rotate(${deg} 60 44)`}
        />
      ))}
      <circle cx="60" cy="44" r="6" className={styles.centerWash} opacity="0.75" />
    </>
  )
}

function Spray() {
  return (
    <>
      <path d="M38 88 C42 72 48 58 54 48 M82 86 C78 70 70 56 64 46" className={styles.sketch} fill="none" strokeWidth="1" />
      <circle cx="48" cy="42" r="14" className={styles.petalDeep} opacity="0.4" />
      <circle cx="72" cy="38" r="11" className={styles.petalLight} opacity="0.5" />
      <circle cx="58" cy="52" r="9" className={styles.petalDeep} opacity="0.35" />
      {[0, 120, 240].map((deg) => (
        <ellipse
          key={deg}
          cx="60"
          cy="48"
          rx="5"
          ry="11"
          className={styles.petalLight}
          opacity="0.55"
          transform={`rotate(${deg} 60 48)`}
        />
      ))}
    </>
  )
}

function Vine() {
  return (
    <>
      <path d="M60 92 Q48 72 52 52 Q56 32 60 24" className={styles.sketch} fill="none" strokeWidth="1.2" />
      <path d="M52 62 C44 58 38 50 42 42 C48 50 50 58 52 62Z" className={styles.leaf} opacity="0.55" />
      <path d="M68 54 C76 50 82 42 78 34 C72 42 70 50 68 54Z" className={styles.leaf} opacity="0.5" />
      <path d="M54 74 C46 72 40 66 44 58 C50 66 52 72 54 74Z" className={styles.leaf} opacity="0.45" />
      <path d="M66 68 C74 66 80 60 76 52 C70 60 68 66 66 68Z" className={styles.leaf} opacity="0.42" />
    </>
  )
}
