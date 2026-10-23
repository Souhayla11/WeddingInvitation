import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

/** Set once the venue is confirmed; the directions button stays hidden until then. */
export const recoveryMapQuery: string | null = null

const toBeConfirmed: Text = { en: 'To be confirmed', es: 'A confirmar' }

export interface RecoveryFact {
  icon: IconName
  label: Text
  value: Text
}

export const recoveryFacts: RecoveryFact[] = [
  {
    icon: 'calendar',
    label: { en: 'When', es: 'Cuándo' },
    value: { en: 'Saturday 13 March · time to be confirmed', es: 'Sábado 13 de marzo · horario a confirmar' },
  },
  {
    icon: 'pin',
    label: { en: 'Where', es: 'Dónde' },
    value: toBeConfirmed,
  },
  {
    icon: 'shirt',
    label: { en: 'Dress code', es: 'Vestimenta' },
    value: toBeConfirmed,
  },
  {
    icon: 'dinner',
    label: { en: 'On the table', es: 'En la mesa' },
    value: toBeConfirmed,
  },
]
