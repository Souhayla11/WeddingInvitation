// Core facts about the day. Venues, addresses and contact details are placeholders until the venue is confirmed.
import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

export const couple = {
  one: 'Daniella',
  two: 'José',
  initials: ['D', 'J'] as const,
}

/** Ceremony start with the venue's UTC offset. Drives the countdown and the calendar file. */
export const weddingStart = '2027-03-12T19:00:00-03:00'
export const weddingEnd = '2027-03-13T05:00:00-03:00'
export const timeZone = 'America/Argentina/Buenos_Aires'
export const dateShort = '12 · 03 · 2027'

export const rsvpDeadline: Text = { en: '15 January 2027', es: '15 de enero de 2027' }
export const location: Text = { en: 'Argentina', es: 'Argentina' }
export const hashtag = '#DaniellaYJose'
export const contactEmail = 'daniella.jose@example.com'

export interface Venue {
  kind: Text
  time: string
  name: string
  address: Text
  /** What to search for in Google Maps. */
  mapQuery: string
  note: Text
}

export const venues: Venue[] = [
  {
    kind: { en: 'Ceremony', es: 'Ceremonia' },
    time: '19:00',
    name: 'Capilla Santa Rosa',
    address: { en: 'Address to be confirmed', es: 'Dirección a confirmar' },
    mapQuery: 'Capilla Santa Rosa Argentina',
    note: {
      en: 'Doors open at 18:30. The ceremony lasts about 45 minutes.',
      es: 'Las puertas abren a las 18:30. La ceremonia dura unos 45 minutos.',
    },
  },
  {
    kind: { en: 'Celebration', es: 'Fiesta' },
    time: '20:30',
    name: 'Estancia Los Álamos',
    address: { en: 'Address to be confirmed', es: 'Dirección a confirmar' },
    mapQuery: 'Estancia Los Álamos Argentina',
    note: {
      en: 'Cocktails, dinner and dancing under the poplars until sunrise.',
      es: 'Recepción, cena y baile bajo los álamos hasta que salga el sol.',
    },
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
      en: 'Formal. Autumn colours are very welcome — please leave white to the bride.',
      es: 'Formal. Los colores otoñales son más que bienvenidos; el blanco, para la novia.',
    },
  },
  {
    icon: 'sun',
    title: { en: 'Weather', es: 'El clima' },
    text: {
      en: 'March is early autumn in Argentina: around 26°C by day and 15°C at night. Bring a light layer.',
      es: 'Marzo es principio de otoño: unos 26 °C de día y 15 °C a la noche. Traé un abrigo liviano.',
    },
  },
  {
    icon: 'chat',
    title: { en: 'Language', es: 'Idioma' },
    text: {
      en: 'The ceremony is in Spanish and English, so everyone can follow along.',
      es: 'La ceremonia va a ser en español e inglés, para que todos puedan seguirla.',
    },
  },
  {
    icon: 'gift',
    title: { en: 'Gifts', es: 'Regalos' },
    text: {
      en: 'Having you there is the gift. If you would like to give something, see the FAQs.',
      es: 'Tu presencia es el mejor regalo. Si querés hacernos un regalo, mirá las preguntas frecuentes.',
    },
  },
]

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
