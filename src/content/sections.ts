import type { Text } from '../i18n/types'

export type SectionId = 'details' | 'schedule' | 'recovery' | 'stay' | 'rsvp'

/** Each section owns one colour from the palette; the menu uses it as a legend. */
export type Accent = 'burgundy' | 'orange' | 'pink' | 'blue' | 'sage'

export interface SectionMeta {
  id: SectionId
  accent: Accent
  /** Short name for the menu. */
  label: Text
  /** One-line summary shown in the mobile menu. */
  hint: Text
}

export const sections: SectionMeta[] = [
  {
    id: 'details',
    accent: 'burgundy',
    label: { en: 'Details', es: 'Detalles' },
    hint: { en: 'Where and when', es: 'Dónde y cuándo' },
  },
  {
    id: 'schedule',
    accent: 'orange',
    label: { en: 'Schedule', es: 'Cronograma' },
    hint: { en: 'Friday, hour by hour', es: 'El viernes, hora a hora' },
  },
  {
    id: 'recovery',
    accent: 'pink',
    label: { en: 'Recovery Dinner', es: 'Día después' },
    hint: { en: 'Saturday evening, casual', es: 'Sábado a la noche, informal' },
  },
  {
    id: 'stay',
    accent: 'blue',
    label: { en: 'Stay & travel', es: 'Alojamiento' },
    hint: { en: 'Hotels, shuttle, getting here', es: 'Hoteles, traslados y cómo llegar' },
  },
  {
    id: 'rsvp',
    accent: 'burgundy',
    label: { en: 'RSVP', es: 'Confirmar' },
    hint: { en: 'Reply by 31 January', es: 'Antes del 31 de enero' },
  },
]

export const sectionById = (id: SectionId) => sections.find((s) => s.id === id)!
