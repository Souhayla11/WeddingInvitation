import { motion } from 'motion/react'
import { Icon } from '../components/Icon'
import { RecoveryAside } from '../components/RecoveryAside'
import { Section } from '../components/Section'
import { recoveryFacts } from '../content/recovery'
import { recovery } from '../content/ui'
import { mapsUrl } from '../content/wedding'
import { useLang } from '../i18n/LanguageContext'
import { hoverLift, reveal } from '../lib/motion'
import styles from './Recovery.module.css'

export function Recovery() {
  const { t } = useLang()
  const detailFacts = recoveryFacts.slice(1)

  return (
    <Section id="recovery">
      <div className={styles.layout}>
        <RecoveryAside />

        <div className={styles.info}>
          <dl className={styles.facts}>
            {detailFacts.map((fact, i) => (
              <motion.div key={fact.icon} className={styles.fact} {...reveal(i * 0.08)} {...hoverLift}>
                <motion.span
                  className={styles.factIcon}
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Icon name={fact.icon} />
                </motion.span>
                <dt className={styles.factLabel}>{t(fact.label)}</dt>
                <dd className={styles.factValue}>
                  {fact.mapQuery ? (
                    <span className={styles.factValueRow}>
                      <span>{t(fact.value)}</span>
                      <a className={`text-link ${styles.factDirections}`} href={mapsUrl(fact.mapQuery)} target="_blank" rel="noreferrer">
                        {t(recovery.directions)}
                        <Icon name="external" />
                      </a>
                    </span>
                  ) : (
                    t(fact.value)
                  )}
                </dd>
              </motion.div>
            ))}
          </dl>

          <motion.div className={styles.footer} {...reveal(0.2)}>
            <p className={styles.note}>{t(recovery.note)}</p>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
