import { AnimatePresence, MotionConfig } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Envelope } from './components/Envelope'
import { Nav } from './components/Nav'
import { nav } from './content/ui'
import { useLang } from './i18n/LanguageContext'
import { Details } from './sections/Details'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Recovery } from './sections/Recovery'
import { Rsvp } from './sections/Rsvp'
import { Schedule } from './sections/Schedule'
import { Stay } from './sections/Stay'

const OPENED_KEY = 'invitation-opened'

/** Show the envelope once per browser tab, and skip it for links that point at a section. */
function alreadyOpened() {
  if (location.hash.length > 1) return true
  try {
    return sessionStorage.getItem(OPENED_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const { lang, t } = useLang()
  const [opened, setOpened] = useState(alreadyOpened)
  const page = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  const open = () => {
    setOpened(true)
    window.scrollTo(0, 0)
    try {
      sessionStorage.setItem(OPENED_KEY, '1')
    } catch {
      // Without storage the envelope simply shows again next time.
    }
  }

  // A soft fade when switching language, so the swap feels intentional.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    page.current?.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 420, easing: 'ease-out' })
  }, [lang])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#details">
        {t(nav.skip)}
      </a>
      <AnimatePresence>{!opened && <Envelope key="envelope" onOpen={open} />}</AnimatePresence>
      <div ref={page} className="site" inert={!opened}>
        <Nav />
        <main className="site-main">
          <Hero ready={opened} />
          <Details />
          <Schedule />
          <Recovery />
          <Stay />
          <Faq />
          <Rsvp />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
