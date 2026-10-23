// FAQs are grouped into tabs. Add a new tab by adding a category to the list below.
import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

export interface Question {
  q: Text
  a: Text
}

export interface Place {
  name: string
  area: Text
  text: Text
  /** Short extra detail, e.g. price or opening days. */
  tag?: Text
  mapQuery: string
}

interface CategoryBase {
  id: string
  icon: IconName
  label: Text
}

export type FaqCategory =
  | (CategoryBase & { kind: 'questions'; items: Question[] })
  /** An empty list shows a "to be confirmed" card. */
  | (CategoryBase & { kind: 'places'; items: Place[] })

export const toBeConfirmed: Text = { en: 'To be confirmed', es: 'A confirmar' }

export const faqCategories: FaqCategory[] = [
  {
    id: 'good-to-know',
    icon: 'info',
    label: { en: 'Good to know', es: 'Información útil' },
    kind: 'questions',
    items: [
      { q: { en: 'Can I bring a plus-one?', es: '¿Puedo ir con acompañante?' }, a: toBeConfirmed },
      { q: { en: 'Are children welcome?', es: '¿Pueden ir chicos?' }, a: toBeConfirmed },
      { q: { en: 'What about gifts?', es: '¿Y los regalos?' }, a: toBeConfirmed },
      { q: { en: 'Can I take photos?', es: '¿Puedo sacar fotos?' }, a: toBeConfirmed },
      { q: { en: 'Should I bring cash?', es: '¿Conviene llevar efectivo?' }, a: toBeConfirmed },
      { q: { en: 'Will there be vegetarian options?', es: '¿Va a haber opciones vegetarianas?' }, a: toBeConfirmed },
      { q: { en: 'When do I need to reply by?', es: '¿Hasta cuándo puedo confirmar?' }, a: toBeConfirmed },
    ],
  },
  {
    id: 'things-to-do',
    icon: 'compass',
    label: { en: 'Things to do', es: 'Qué hacer' },
    kind: 'places',
    items: [],
  },
  {
    id: 'hair-beauty',
    icon: 'scissors',
    label: { en: 'Hair & beauty', es: 'Peluquerías' },
    kind: 'places',
    items: [],
  },
  {
    id: 'where-to-eat',
    icon: 'dinner',
    label: { en: 'Where to eat', es: 'Dónde comer' },
    kind: 'places',
    items: [],
  },
]
