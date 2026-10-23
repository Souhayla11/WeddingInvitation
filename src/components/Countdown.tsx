import { AnimatePresence, motion } from 'motion/react'
import { hero } from '../content/ui'
import { useCountdown } from '../hooks/useCountdown'
import { useLang } from '../i18n/LanguageContext'
import styles from './Countdown.module.css'

const units = ['days', 'hours', 'minutes', 'seconds'] as const

export function Countdown({
  target,
  light,
  textGlow,
  heroGlass,
}: {
  target: string
  light?: boolean
  textGlow?: boolean
  /** Frosted chip on hero — burgundy digits (not white `light` mode) */
  heroGlass?: boolean
}) {
  const { t } = useLang()
  const remaining = useCountdown(target)

  if (remaining.done) {
    return (
      <p className={styles.done} data-text-glow={textGlow || undefined}>
        {t(hero.married)}
      </p>
    )
  }

  return (
    <div
      className={styles.countdown}
      data-light={light || undefined}
      data-text-glow={textGlow || undefined}
      data-hero-glass={heroGlass || undefined}
      role="timer"
      aria-label={t(hero.countdownLabel)}
    >
      {units.map((unit) => {
        const value = remaining[unit]
        return (
          <div className={styles.cell} key={unit}>
            <span className={styles.value}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={value}
                  initial={{ y: '70%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-70%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {String(value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className={styles.unit}>{t(hero.units[unit])}</span>
          </div>
        )
      })}
    </div>
  )
}
