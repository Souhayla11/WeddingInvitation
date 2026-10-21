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
