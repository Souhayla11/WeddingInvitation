export type Lang = 'en' | 'es'

/** Every piece of guest-facing copy is written once per language, side by side. */
export type Text = Record<Lang, string>

export const languages: { code: Lang; label: string; name: string; locale: string }[] = [
  { code: 'en', label: 'EN', name: 'English', locale: 'en-GB' },
  { code: 'es', label: 'ES', name: 'Español', locale: 'es-ES' },
]
