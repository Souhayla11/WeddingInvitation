import { motion } from 'motion/react'
import { useId } from 'react'
import styles from './HeroSunset.module.css'

/** Full-bleed sunset atmosphere for the hero — not a framed picture. */
export function HeroSunset({ play }: { play: boolean }) {
  const id = useId()

  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8b4ae" />
            <stop offset="0.35" stopColor="#efc3b2" />
            <stop offset="0.58" stopColor="#f5c99d" />
            <stop offset="0.78" stopColor="#f2a96f" />
            <stop offset="1" stopColor="#c8662d" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id={`${id}-sun`} cx="50%" cy="100%" r="45%">
            <stop offset="0" stopColor="#fbe0bb" stopOpacity="0.95" />
            <stop offset="0.35" stopColor="#f2a96f" stopOpacity="0.5" />
            <stop offset="1" stopColor="#e07a41" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill={`url(#${id}-sky)`} />
        <motion.ellipse
          cx="720"
          cy="620"
          rx="420"
          ry="280"
          fill={`url(#${id}-sun)`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={play ? { opacity: 1, scale: [1, 1.04, 1] } : { opacity: 0, scale: 0.85 }}
          transition={{
            opacity: { duration: 1.2 },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          }}
          style={{ transformOrigin: '720px 620px' }}
        />
        <circle cx="720" cy="548" r="72" fill="#e07a41" opacity="0.92" />
        <circle cx="698" cy="528" r="18" fill="#fbe0bb" opacity="0.35" />
        {/* Distant Andes */}
        <path
          d="M0 520 L120 460 L220 500 L340 420 L480 480 L620 400 L760 470 L900 410 L1040 480 L1180 430 L1320 490 L1440 450 V900 H0Z"
          fill="#8ea4ba"
          opacity="0.55"
        />
        <path
          d="M0 580 L160 520 L300 560 L460 500 L620 540 L780 490 L940 530 L1100 500 L1260 550 L1440 520 V900 H0Z"
          fill="#7591ab"
          opacity="0.7"
        />
        <path d="M0 640 C240 600 480 620 720 610 C960 600 1200 630 1440 615 V900 H0Z" fill="#52623f" opacity="0.35" />
        <path d="M0 680 C360 650 720 660 1080 645 C1260 638 1380 652 1440 658 V900 H0Z" fill="#66754f" opacity="0.45" />
      </svg>
      <motion.div
        className={styles.wash}
        animate={play ? { opacity: [0.15, 0.28, 0.15] } : { opacity: 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
