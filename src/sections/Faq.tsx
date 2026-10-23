import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Icon } from '../components/Icon'
import { Section } from '../components/Section'
import { faqCategories, toBeConfirmed, type Place, type Question } from '../content/faq'
import { faq } from '../content/ui'
import { contactEmail, mapsUrl } from '../content/wedding'
import { useLang } from '../i18n/LanguageContext'
import { ease, reveal } from '../lib/motion'
import styles from './Faq.module.css'

export function Faq() {
  const { t } = useLang()
  const [activeId, setActiveId] = useState(faqCategories[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()
  const active = faqCategories.find((c) => c.id === activeId)!

  // Arrow keys move between tabs, as screen-reader users expect.
  const onTabKey = (e: KeyboardEvent, index: number) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const next = (index + delta + faqCategories.length) % faqCategories.length
    setActiveId(faqCategories[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="faq">
      <motion.div className={styles.tabs} role="tablist" aria-label={t(faq.tabsLabel)} {...reveal()}>
        {faqCategories.map((cat, i) => {
          const selected = cat.id === activeId
          return (
            <button
              key={cat.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${cat.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => setActiveId(cat.id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {selected && <motion.span layoutId={`${baseId}-pill`} className={styles.pill} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
              <Icon name={cat.icon} className={styles.tabIcon} />
              <span className={styles.tabLabel}>{t(cat.label)}</span>
            </button>
          )
        })}
      </motion.div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className={styles.panel}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
          >
            {active.kind === 'questions' ? <Questions items={active.items} /> : <Places items={active.items} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.p className={styles.more} {...reveal()}>
        {t(faq.more)} <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </motion.p>
    </Section>
  )
}

function Questions({ items }: { items: Question[] }) {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <ul className={styles.questions}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={i} className={styles.question} data-open={isOpen}>
            <h3>
              <button
                type="button"
                className={styles.qButton}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{t(item.q)}</span>
                <span className={styles.qIcon} aria-hidden="true">
                  <Icon name="plus" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${baseId}-a${i}`}
                  className={styles.answer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <p>{t(item.a)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}

function Places({ items }: { items: Place[] }) {
  const { t } = useLang()
  if (!items.length) {
    return (
      <ul className={styles.places}>
        <li className={styles.place}>
          <h3 className={styles.placeName}>{t(toBeConfirmed)}</h3>
        </li>
      </ul>
    )
  }
  return (
    <ul className={styles.places}>
      {items.map((place, i) => (
        <motion.li
          key={place.name}
          className={styles.place}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease }}
        >
          <div className={styles.placeTop}>
            <p className={styles.area}>{t(place.area)}</p>
            {place.tag && <span className={styles.placeTag}>{t(place.tag)}</span>}
          </div>
          <h3 className={styles.placeName}>{place.name}</h3>
          <p className={styles.placeText}>{t(place.text)}</p>
          <a className="text-link" href={mapsUrl(place.mapQuery)} target="_blank" rel="noreferrer">
            {t(faq.map)}
            <Icon name="external" />
          </a>
        </motion.li>
      ))}
    </ul>
  )
}
