import { motion } from 'motion/react'
import { useId } from 'react'
import { nav } from '../content/ui'
import { useLang } from '../i18n/LanguageContext'
import { languages } from '../i18n/types'
import styles from './LanguageSwitch.module.css'

export function LanguageSwitch({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { lang, setLang, t } = useLang()
  const pillId = useId()

  return (
    <div className={styles.switch} data-tone={tone} role="group" aria-label={t(nav.language)}>
      {languages.map((l) => {
        const active = lang === l.code
        return (
          <button
            key={l.code}
            type="button"
            className={styles.option}
            aria-pressed={active}
            onClick={() => setLang(l.code)}
            lang={l.code}
            title={l.name}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                className={styles.pill}
                transition={{ type: 'spring', stiffness: 520, damping: 40 }}
              />
            )}
            <span className={styles.label}>{l.label}</span>
            <span className="sr-only">{l.name}</span>
          </button>
        )
      })}
    </div>
  )
}
