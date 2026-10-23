import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

export interface ScheduleItem {
  time: string
  icon: IconName
  title: Text
  text?: Text
}

export const schedule: ScheduleItem[] = [
  {
    time: '14:00',
    icon: 'rings',
    title: { en: 'Ceremony', es: 'Ceremonia' },
    text: { en: 'Parroquia San Eduardo', es: 'Parroquia San Eduardo' },
  },
  {
    time: '16:00',
    icon: 'glass',
    title: { en: 'Cocktails and nibbles', es: 'Cóctel y bocaditos' },
  },
  {
    time: '19:30',
    icon: 'dinner',
    title: { en: 'Dinner', es: 'Cena' },
  },
  {
    time: '21:30',
    icon: 'cake',
    title: { en: 'Dessert', es: 'Postre' },
  },
  {
    time: '22:00',
    icon: 'music',
    title: { en: 'Fiesta', es: 'Fiesta' },
  },
]
