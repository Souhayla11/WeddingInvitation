import { createContext, useContext } from 'react'
import type { Lang, Text } from './types'

export interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Pick the current language from a bilingual Text value. */
  t: (text: Text) => string
  /** BCP 47 locale for Intl date/number formatting. */
  locale: string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
