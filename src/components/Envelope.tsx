import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import design2Art from '../../designs/design2.jpeg'
import { envelope } from '../content/ui'
import { couple, dateShort } from '../content/wedding'
import { useLang } from '../i18n/LanguageContext'
import { ease } from '../lib/motion'
import { LanguageSwitch } from './LanguageSwitch'
import { Seal } from './Seal'
import styles from './Envelope.module.css'

type Phase = 'closed' | 'opening' | 'rising'

/** The sealed envelope guests open to enter the site. */
export function Envelope({ onOpen }: { onOpen: () => void }) {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('closed')
  const timers = useRef<number[]>([])
  const [coarse] = useState(() => window.matchMedia('(pointer: coarse)').matches)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const pending = timers.current
    return () => {
      document.body.style.overflow = previous
      pending.forEach(clearTimeout)
    }
  }, [])

  const open = () => {
    if (phase !== 'closed') return
    if (reduceMotion) {
      onOpen()
      return
    }
    setPhase('opening')
    timers.current.push(
      window.setTimeout(() => setPhase('rising'), 700),
      window.setTimeout(onOpen, 1900),
    )
  }

  const flapOpen = phase !== 'closed'
  const cardOut = phase === 'rising'

  return (
    <motion.div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={t(envelope.open)}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease }}
    >
      <div className={styles.topbar}>
        <LanguageSwitch tone="light" />
      </div>

      <motion.p
        className={styles.kicker}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: cardOut ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, delay: cardOut ? 0 : 0.3, ease }}
      >
        {t(envelope.kicker)}
      </motion.p>

      <motion.div
        className={styles.stage}
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: cardOut ? 60 : 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 1.12, y: 20 }}
        transition={{ duration: 1, ease }}
      >
        <div className={styles.envelope} onClick={open}>
          <div className={styles.back} />

          <motion.div
            className={styles.card}
            animate={{ y: cardOut ? '-62%' : '0%' }}
            transition={{ duration: 1.1, ease }}
          >
            <img className={styles.cardArt} src={design2Art} alt="" aria-hidden="true" />
            <span className={styles.cardLine}>{t(envelope.cardLine)}</span>
            <span className={styles.cardNames}>
              {couple.one} <i>&amp;</i> {couple.two}
            </span>
            <span className={styles.cardDate}>{dateShort}</span>
          </motion.div>

          <svg className={styles.pocket} viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 L150 112 L0 200 Z" fill="#e9dbc3" />
            <path d="M300 0 L150 112 L300 200 Z" fill="#e6d6bc" />
            <path d="M0 200 L150 96 L300 200 Z" fill="#f1e6d3" />
            <path d="M0 200 L150 96 L300 200" fill="none" stroke="#6b1e2e" strokeOpacity="0.08" />
          </svg>

          <motion.div
            className={styles.flap}
            style={{ zIndex: cardOut ? 1 : 4 }}
            animate={{ rotateX: flapOpen ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <span className={styles.flapFront} />
            <span className={styles.flapBack} />
          </motion.div>

          <motion.button
            type="button"
            className={styles.seal}
            onClick={(e) => {
              e.stopPropagation()
              open()
            }}
            aria-label={t(envelope.open)}
            animate={flapOpen ? { scale: 1.3, opacity: 0, rotate: 12 } : { scale: 1, opacity: 1, rotate: 0 }}
            whileHover={flapOpen ? undefined : { scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.45, ease }}
          >
            <span className={styles.pulse} aria-hidden="true" />
            <Seal size={84} />
          </motion.button>
        </div>
      </motion.div>

      <motion.p
        className={styles.hint}
        initial={{ opacity: 0 }}
        animate={{ opacity: flapOpen ? 0 : 1 }}
        transition={{ duration: 0.6, delay: flapOpen ? 0 : 0.9 }}
      >
        {t(coarse ? envelope.hintTouch : envelope.hintPointer)}
      </motion.p>
    </motion.div>
  )
}
