import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { sections, type SectionId } from '../content/sections'
import { nav } from '../content/ui'
import { couple, dateShort, location } from '../content/wedding'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useLang } from '../i18n/LanguageContext'
import { ease } from '../lib/motion'
import { LanguageSwitch } from './LanguageSwitch'
import styles from './Nav.module.css'

const spyIds = ['top', ...sections.map((s) => s.id)] as const

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`)
}

export function Nav() {
  const { t } = useLang()
  const spied = useScrollSpy(spyIds)
  const active = spied === 'top' ? null : (spied as SectionId | null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    // Wait a frame so the scroll lock from the open menu is released first.
    requestAnimationFrame(() => scrollToSection(id))
  }

  return (
    <header className={styles.nav} data-solid={scrolled || menuOpen}>
      <div className={styles.inner}>
        <a href="#top" className={styles.monogram} onClick={go('top')} aria-label={t(nav.home)}>
          {couple.initials[0]}
          <span>&amp;</span>
          {couple.initials[1]}
        </a>

        <nav aria-label={t(nav.label)} className={styles.desktop}>
          <ul className={styles.links}>
            {sections.map((s) => {
              const isActive = active === s.id
              const isCta = s.id === 'rsvp'
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={go(s.id)}
                    data-accent={s.accent}
                    className={isCta ? styles.cta : styles.link}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {t(s.label)}
                    {isActive && !isCta && (
                      <motion.span layoutId="nav-dot" className={styles.dot} transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.end}>
          <LanguageSwitch />
          <button
            ref={menuButton}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.burger} data-open={menuOpen} aria-hidden="true">
              <span />
              <span />
            </span>
            {t(menuOpen ? nav.close : nav.menu)}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label={t(nav.label)}
            className={styles.sheet}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease }}
          >
            <ul className={styles.sheetList}>
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  data-accent={s.accent}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.05, ease }}
                >
                  <a href={`#${s.id}`} onClick={go(s.id)} className={styles.sheetLink} aria-current={active === s.id ? 'true' : undefined}>
                    <span className={styles.sheetDot} aria-hidden="true" />
                    <span className={styles.sheetLabel}>{t(s.label)}</span>
                    <span className={styles.sheetHint}>{t(s.hint)}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.p
              className={styles.sheetFoot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {dateShort} — {t(location)}
            </motion.p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
