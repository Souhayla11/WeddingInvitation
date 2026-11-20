import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { envelope } from '../content/ui'
import { couple, dateShort } from '../content/wedding'
import { useLang } from '../i18n/LanguageContext'
import { LanguageSwitch } from './LanguageSwitch'
import { Seal } from './Seal'
import styles from './Envelope.module.css'

type Phase = 'closed' | 'lifting' | 'sliding'

/** Flap peels away slowly, speeds up as it swings over, then settles. */
const flapEase: [number, number, number, number] = [0.5, 0.04, 0.24, 1]
/** The pocket glides down like a sheet of paper being drawn away. */
const slideEase: [number, number, number, number] = [0.62, 0, 0.28, 1]
const soft: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface EnvelopeProps {
  /** Fired as the flap lifts, so the hero starts playing underneath. */
  onReveal: () => void
  /** Fired once the envelope has fully cleared the screen. */
  onOpen: () => void
}

/**
 * A full-screen envelope laid over the live hero. The flap swings up and over,
 * then the front pocket slides down, so the page appears to sit inside the envelope.
 */
export function Envelope({ onReveal, onOpen }: EnvelopeProps) {
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
      onReveal()
      onOpen()
      return
    }
    setPhase('lifting')
    timers.current.push(
      window.setTimeout(onReveal, 450),
      window.setTimeout(() => setPhase('sliding'), 1500),
      window.setTimeout(onOpen, 3550),
    )
  }

  const started = phase !== 'closed'
  const sliding = phase === 'sliding'

  return (
    <motion.div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={t(envelope.open)}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={styles.topbar}
        animate={{ opacity: started ? 0 : 1 }}
        transition={{ duration: 0.45, ease: soft }}
      >
        <LanguageSwitch />
      </motion.div>

      {/* Depth cast by the flap onto the page inside */}
      <motion.div
        className={styles.innerShade}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: sliding ? 0 : started ? 1 : 0 }}
        transition={{ duration: sliding ? 1.7 : 0.9, ease: soft }}
      />

      {/* Front of the envelope: everything below the V */}
      <motion.div
        className={styles.pocket}
        onClick={open}
        animate={{ y: sliding ? '106%' : '0%' }}
        transition={{ duration: 1.9, ease: slideEase }}
      >
        <div className={styles.pocketLiner} />
        <div className={styles.pocketFace} />
      </motion.div>

      <motion.div
        className={styles.address}
        animate={{ opacity: started ? 0 : 1, y: started ? 10 : 0 }}
        transition={{ duration: 0.5, ease: soft, delay: started ? 0 : 0.5 }}
      >
        <span className={styles.names}>
          {couple.one} <i>&amp;</i> {couple.two}
        </span>
        <span className={styles.date}>{dateShort}</span>
        <span className={styles.hint}>{t(coarse ? envelope.hintTouch : envelope.hintPointer)}</span>
      </motion.div>

      {/* The flap carries the seal and swings up and over the top edge */}
      <motion.div
        className={styles.flap}
        onClick={open}
        animate={{ rotateX: started ? 180 : 0 }}
        transition={{ duration: 1.9, ease: flapEase, delay: started ? 0.4 : 0 }}
      >
        <div className={styles.flapFront}>
          <svg className={styles.flapLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="5.5,0 50,89 94.5,0" />
          </svg>
          <motion.p
            className={styles.kicker}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: soft, delay: 0.3 }}
          >
            {t(envelope.kicker)}
          </motion.p>
        </div>
        <div className={styles.flapBack} />

        <motion.button
          type="button"
          className={styles.seal}
          onClick={(e) => {
            e.stopPropagation()
            open()
          }}
          aria-label={t(envelope.open)}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={started ? { opacity: 1, scale: [1, 1.12, 1], rotate: [0, -4, 0] } : { opacity: 1, scale: 1, rotate: 0 }}
          whileHover={started ? undefined : { scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={started ? { duration: 0.5, ease: soft } : { duration: 0.8, ease: soft, delay: 0.4 }}
        >
          <span className={styles.pulse} data-off={started} aria-hidden="true" />
          <Seal size={96} />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
