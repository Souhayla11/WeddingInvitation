import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'
import { mapsUrl } from './wedding'

export interface StayOption {
  name: string
  note?: Text
  href: string
  linkLabel: Text
}

export interface StayArea {
  name: string
  options?: StayOption[]
  /** Shown under the options, or alone when there are none yet. */
  text: Text
}

const viewOnMap: Text = { en: 'View on map', es: 'Ver en el mapa' }
const browse: Text = { en: 'Browse stays', es: 'Ver opciones' }

export const stayAreas: StayArea[] = [
  {
    name: 'Bariloche',
    options: [
      {
        name: 'El Casco Art Hotel',
        note: { en: 'Where the reception will be held', es: 'Donde será la recepción' },
        href: mapsUrl('El Casco Art Hotel, San Carlos de Bariloche'),
        linkLabel: viewOnMap,
      },
      {
        name: 'Airbnb',
        href: 'https://www.airbnb.com/s/San-Carlos-de-Bariloche--Argentina/homes',
        linkLabel: browse,
      },
      {
        name: 'Booking.com',
        href: 'https://www.booking.com/searchresults.html?ss=San+Carlos+de+Bariloche',
        linkLabel: browse,
      },
    ],
    text: { en: 'Plenty of options.', es: 'Hay muchas opciones.' },
  },
  {
    name: 'El Bolsón',
    text: { en: 'To be announced.', es: 'A confirmar.' },
  },
]

export interface TravelOption {
  icon: IconName
  title: Text
  text: Text
}

export const gettingThere: TravelOption[] = [
  {
    icon: 'plane',
    title: { en: 'By plane', es: 'En avión' },
    text: {
      en: 'There are direct flights from Buenos Aires to Bariloche.',
      es: 'Hay vuelos directos de Buenos Aires a Bariloche.',
    },
  },
]

export const gettingAround: TravelOption[] = [
  {
    icon: 'car',
    title: { en: 'By car', es: 'En auto' },
    text: {
      en: 'We recommend hiring a car or carpooling.',
      es: 'Te recomendamos alquilar un auto o compartir el viaje.',
    },
  },
  {
    icon: 'phone',
    title: { en: 'Taxis, buses & Uber', es: 'Taxis, colectivos y Uber' },
    text: {
      en: 'Taxis, buses and Ubers are also available.',
      es: 'También hay taxis, colectivos y Uber.',
    },
  },
]
