import { motion, type Variants } from 'motion/react'
import { Countdown } from '../components/Countdown'
import { Icon } from '../components/Icon'
import { HeroSunset } from '../components/HeroSunset'
import { SectionFlowers } from '../components/SectionFlowers'
import { hero } from '../content/ui'
import { couple, location, timeZone, venues, weddingStart } from '../content/wedding'
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
      <HeroSunset play={ready} />
      <SectionFlowers zone="hero" />

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
        <motion.p className={styles.place} variants={fadeUp}>
          {venues[1].name} · {t(location)}
        </motion.p>

        <motion.div className={styles.countdown} variants={fadeUp}>
          <Countdown target={weddingStart} light />
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
