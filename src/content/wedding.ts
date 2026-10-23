// Core facts about the day. Contact details are still placeholders.
import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

export const couple = {
  one: 'Daniella',
  two: 'José',
  initials: ['D', 'J'] as const,
}

/** Ceremony start with the venue's UTC offset. Drives the countdown and the calendar file. */
export const weddingStart = '2027-03-12T14:00:00-03:00'
export const weddingEnd = '2027-03-13T05:00:00-03:00'
export const timeZone = 'America/Argentina/Buenos_Aires'
export const dateShort = '12 · 03 · 2027'

export const rsvpDeadline: Text = { en: '15 January 2027', es: '15 de enero de 2027' }
export const location: Text = { en: 'Argentina', es: 'Argentina' }
export const hashtag = '#DaniellaYJose'
export const contactEmail = 'daniella.jose@example.com'

export interface Venue {
  kind: Text
  /** Omitted when the venue simply follows the previous one. */
  time?: string
  name: string
  address: Text
  /** What to search for in Google Maps. */
  mapQuery: string
  note?: Text
}

export const venues: Venue[] = [
  {
    kind: { en: 'Ceremony', es: 'Ceremonia' },
    time: '14:00',
    name: 'Parroquia San Eduardo',
    address: {
      en: 'Av. Bustillo km 25.5, Llao Llao, San Carlos de Bariloche, Río Negro',
      es: 'Av. Bustillo km 25,5, Llao Llao, San Carlos de Bariloche, Río Negro',
    },
    mapQuery: 'Parroquia San Eduardo, Llao Llao, San Carlos de Bariloche',
    note: {
      en: 'The ceremony will commence at 2pm.',
      es: 'La ceremonia comenzará a las 14 h.',
    },
  },
  {
    kind: { en: 'Reception', es: 'Recepción' },
    name: 'El Casco Art Hotel',
    address: {
      en: 'Av. Ezequiel Bustillo km 11.5, San Carlos de Bariloche, Río Negro',
      es: 'Av. Ezequiel Bustillo km 11,5, San Carlos de Bariloche, Río Negro',
    },
    mapQuery: 'El Casco Art Hotel, San Carlos de Bariloche',
  },
]

export interface Note {
  icon: IconName
  title: Text
  text: Text
}

export const detailNotes: Note[] = [
  {
    icon: 'dress',
    title: { en: 'Dress code', es: 'Vestimenta' },
    text: {
      en: 'Please dress in cocktail attire.',
      es: 'Les pedimos vestimenta de cóctel.',
    },
  },
]

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
