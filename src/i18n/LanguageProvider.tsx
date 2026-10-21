import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { meta } from '../content/ui'
import { LanguageContext } from './LanguageContext'
import { languages, type Lang, type Text } from './types'

const STORAGE_KEY = 'wedding-lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    // Storage can be blocked (private mode); fall back to the browser language.
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not persisting the choice is fine.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = meta.title[lang]
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description[lang])
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (text: Text) => text[lang],
      locale: languages.find((l) => l.code === lang)!.locale,
    }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
