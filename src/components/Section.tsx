import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { sectionById, type SectionId } from '../content/sections'
import { sectionCopy } from '../content/ui'
import { useLang } from '../i18n/LanguageContext'
import { reveal } from '../lib/motion'
import { emphasis } from '../lib/text'
import { SectionFlowers } from './SectionFlowers'
import styles from './Section.module.css'

interface SectionProps {
  id: SectionId
  tone?: 'cream' | 'paper' | 'dark'
  children: ReactNode
}

export function Section({ id, tone = 'cream', children }: SectionProps) {
  const { t } = useLang()
  const { accent } = sectionById(id)
  const copy = sectionCopy[id]

  return (
    <section id={id} data-accent={accent} className={`${styles.section} ${styles[tone]}`} aria-labelledby={`${id}-title`}>
      <SectionFlowers zone={id} />
      <div className="container">
        <header className={styles.header}>
          <motion.p className={styles.eyebrow} {...reveal()}>
            <Sprig />
            {t(copy.eyebrow)}
          </motion.p>
          <motion.h2 id={`${id}-title`} className={styles.title} {...reveal(0.08)}>
            {emphasis(t(copy.title))}
          </motion.h2>
          <Ornament />
          {copy.intro && (
            <motion.p className={styles.intro} {...reveal(0.16)}>
              {t(copy.intro)}
            </motion.p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}

/** A fine rule with a diamond at its heart, drawn outward from the centre as it scrolls in. */
function Ornament() {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <svg className={styles.ornament} width="200" height="18" viewBox="0 0 200 18" fill="none" aria-hidden="true">
      <motion.path d="M92 9H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" {...draw(0.25)} />
      <motion.path d="M108 9H186" stroke="currentColor" strokeWidth="1" strokeLinecap="round" {...draw(0.25)} />
      <motion.circle
        cx="8"
        cy="9"
        r="1.6"
        fill="currentColor"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{ transformOrigin: '8px 9px' }}
      />
      <motion.circle
        cx="192"
        cy="9"
        r="1.6"
        fill="currentColor"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{ transformOrigin: '192px 9px' }}
      />
      <motion.path
        d="M100 2.5 106.5 9 100 15.5 93.5 9Z"
        fill="currentColor"
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '100px 9px' }}
      />
    </svg>
  )
}

/** A small leafy sprig in the section's colour. */
function Sprig() {
  return (
    <motion.svg
      className={styles.sprig}
      width="34"
      height="14"
      viewBox="0 0 34 14"
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '0% 50%' }}
    >
      <path d="M1 7h32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <motion.path
        d="M9 7c1-3.5 4-5 7-5-1 3.5-4 5-7 5zM9 7c1 3.5 4 5 7 5-1-3.5-4-5-7-5z"
        fill="currentColor"
        opacity="0.9"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '12px 7px' }}
      />
      <motion.path
        d="M19 7c1-3 3.4-4.3 6-4.3-.9 3-3.4 4.3-6 4.3zM19 7c1 3 3.4 4.3 6 4.3-.9-3-3.4-4.3-6-4.3z"
        fill="currentColor"
        opacity="0.6"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.28, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '22px 7px' }}
      />
    </motion.svg>
  )
}
