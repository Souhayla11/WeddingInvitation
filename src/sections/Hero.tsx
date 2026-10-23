import { motion, type Variants } from 'motion/react'
import { Countdown } from '../components/Countdown'
import { Icon } from '../components/Icon'
import { HeroBackground } from '../components/HeroBackground'
import { hero } from '../content/ui'
import { couple, timeZone, weddingStart } from '../content/wedding'
import { useLang } from '../i18n/LanguageContext'
import { ease } from '../lib/motion'
import { capitalize } from '../lib/text'
import styles from './Hero.module.css'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
}
const nameIn: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
}
const ampIn: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.9, ease, delay: 0.35 } },
}

export function Hero({ ready }: { ready: boolean }) {
  const { t, locale } = useLang()
  const longDate = capitalize(
    new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone }).format(
      new Date(weddingStart),
    ),
  )

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <HeroBackground play={ready} />

      <motion.div
        className={styles.frame}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        <svg className={styles.lineTop} viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M0 5 C 25 3.6, 60 6.4, 100 4.6" />
          <path className={styles.echo} d="M0 6.4 C 18 5.6, 30 6.8, 42 6" />
        </svg>
        <svg className={styles.lineLeft} viewBox="0 0 10 100" preserveAspectRatio="none">
          <path d="M5 0 C 3.6 30, 6.4 62, 4.8 100" />
          <path className={styles.echo} d="M6.4 0 C 5.8 12, 6.8 22, 6.1 34" />
        </svg>
        <svg className={styles.lineRight} viewBox="0 0 10 100" preserveAspectRatio="none">
          <path d="M5 0 C 6.4 35, 3.6 65, 5.2 100" />
        </svg>
      </motion.div>

      <motion.div className={styles.inner} variants={container} initial="hidden" animate={ready ? 'show' : 'hidden'}>
        <motion.p className={styles.eyebrow} variants={fadeUp}>
          {t(hero.eyebrow)}
        </motion.p>

        <h1 id="hero-title" className={styles.names}>
          <motion.span className={styles.one} variants={nameIn}>
            {couple.one}
          </motion.span>
          <motion.span className={styles.amp} variants={ampIn} aria-hidden="true">
            &amp;
          </motion.span>
          <motion.span className={styles.two} variants={nameIn}>
            {couple.two}
          </motion.span>
        </h1>

        <motion.p className={styles.date} variants={fadeUp}>
          {longDate}
        </motion.p>

        <motion.div className={styles.countdown} variants={fadeUp}>
          <Countdown target={weddingStart} heroGlass />
        </motion.div>

        <motion.div className={styles.actions} variants={fadeUp}>
          <a className="btn btn-primary" href="#rsvp">
            {t(hero.rsvp)}
          </a>
          <a className="text-link" href="#schedule">
            {t(hero.schedule)}
            <Icon name="arrow" />
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#details"
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? [0, 5, 0] : 0 }}
        transition={{
          opacity: { delay: 2, duration: 1 },
          y: { delay: 2.5, duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {t(hero.scroll)}
        <span aria-hidden="true" />
      </motion.a>
    </section>
  )
}
