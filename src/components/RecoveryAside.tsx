import { motion } from 'motion/react'
import { Icon } from './Icon'
import { recoveryFacts } from '../content/recovery'
import { recovery, recoveryTags } from '../content/ui'
import { useLang } from '../i18n/LanguageContext'
import styles from './RecoveryAside.module.css'

/** Typographic moment card — no food illustration. */
export function RecoveryAside() {
  const { t } = useLang()
  const when = recoveryFacts[0]

  return (
    <motion.aside
      className={styles.aside}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.glow} aria-hidden="true" />
      <motion.span
        className={styles.iconRing}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon name="dinner" />
      </motion.span>
      <p className={styles.kicker}>{t(when.label)}</p>
      <p className={styles.when}>{t(when.value)}</p>
      <p className={styles.script}>{t(recovery.script)}</p>
      <ul className={styles.tags}>
        <li>{t(recoveryTags.asado)}</li>
        <li>{t(recoveryTags.malbec)}</li>
        <li>{t(recoveryTags.quincho)}</li>
      </ul>
    </motion.aside>
  )
}
