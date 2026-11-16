import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

export const recoveryMapQuery = 'Agua Del Este, Paraje Entre Rios, Rio Negro, Argentina'

export interface RecoveryFact {
  icon: IconName
  label: Text
  value: Text
  mapQuery?: string
}

export const recoveryFacts: RecoveryFact[] = [
  {
    icon: 'calendar',
    label: { en: 'When', es: 'Cuándo' },
    value: { en: 'Saturday 13 March · At 18:00', es: 'Sábado 13 de marzo · a las 18:00' },
  },
  {
    icon: 'pin',
    label: { en: 'Where', es: 'Dónde' },
    value: {
      en: 'Agua Del Este, Paraje Entre Ríos',
      es: 'Agua Del Este, Paraje Entre Ríos',
    },
    mapQuery: recoveryMapQuery,
  },
  {
    icon: 'car',
    label: { en: 'Getting there', es: 'Cómo llegar' },
    value: {
      en: 'About a 1.5 hours drive from Bariloche — by car or bus.',
      es: 'Un viaje de aproximadamente 1,5 horas desde Bariloche, en auto o micro.',
    },
  },
  {
    icon: 'shirt',
    label: { en: 'Dress code', es: 'Vestimenta' },
    value: { en: 'Smart casual.', es: 'Smart casual.' },
  },
  {
    icon: 'dinner',
    label: { en: 'Dinner', es: 'Cena' },
    value: {
      en: 'A relaxed dinner with drinks.',
      es: 'Cena tranquila con bebidas.',
    },
  },
]
