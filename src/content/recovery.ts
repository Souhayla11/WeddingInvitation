import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

export const recoveryMapQuery = 'Estancia Los Álamos Argentina'

export interface RecoveryFact {
  icon: IconName
  label: Text
  value: Text
}

export const recoveryFacts: RecoveryFact[] = [
  {
    icon: 'calendar',
    label: { en: 'When', es: 'Cuándo' },
    value: { en: 'Saturday 13 March · from 20:00', es: 'Sábado 13 de marzo · desde las 20' },
  },
  {
    icon: 'pin',
    label: { en: 'Where', es: 'Dónde' },
    value: {
      en: 'The quincho (barbecue house) at Estancia Los Álamos. A shuttle leaves the hotels at 19:30.',
      es: 'El quincho de la Estancia Los Álamos. Hay traslado desde los hoteles a las 19:30.',
    },
  },
  {
    icon: 'shirt',
    label: { en: 'Dress code', es: 'Vestimenta' },
    value: {
      en: 'Come as you are. Sunglasses optional.',
      es: 'Vení como quieras. Los anteojos de sol, opcionales.',
    },
  },
  {
    icon: 'dinner',
    label: { en: 'On the table', es: 'En la mesa' },
    value: {
      en: 'Asado, provoleta, salads and plenty of Malbec.',
      es: 'Asado, provoleta, ensaladas y Malbec de sobra.',
    },
  },
]
