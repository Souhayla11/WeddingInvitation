import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

export interface Hotel {
  name: string
  tag: Text
  distance: Text
  price: '$' | '$$' | '$$$'
  text: Text
  /** Discount code for wedding guests, if the hotel offers one. */
  code?: string
  mapQuery: string
}

export const hotels: Hotel[] = [
  {
    name: 'Posada Los Álamos',
    tag: { en: 'On the estancia', es: 'En la estancia' },
    distance: { en: 'On site — no shuttle needed', es: 'En el mismo lugar, sin traslado' },
    price: '$$$',
    text: {
      en: 'Twelve rooms in the original house, with a pool and views over the fields. We are staying here too.',
      es: 'Doce habitaciones en la casona original, con pileta y vista al campo. Nosotros también nos quedamos acá.',
    },
    code: 'DANIELLAJOSE27',
    mapQuery: 'Posada Los Álamos Argentina',
  },
  {
    name: 'Hotel Plaza',
    tag: { en: 'In town', es: 'En el pueblo' },
    distance: { en: '15 min drive to the estancia', es: 'A 15 min en auto de la estancia' },
    price: '$$',
    text: {
      en: 'Bright rooms on the main square, a big breakfast and a terrace made for the morning after.',
      es: 'Habitaciones luminosas frente a la plaza, buen desayuno y una terraza ideal para el día siguiente.',
    },
    code: 'DANIELLAJOSE27',
    mapQuery: 'Hotel Plaza Argentina',
  },
  {
    name: 'Hostería del Camino',
    tag: { en: 'Budget-friendly', es: 'Económico' },
    distance: { en: '20 min drive to the estancia', es: 'A 20 min en auto de la estancia' },
    price: '$',
    text: {
      en: 'Simple, clean and friendly. Rooms go fast in March.',
      es: 'Sencilla, limpia y con muy buena atención. En marzo las habitaciones vuelan.',
    },
    mapQuery: 'Hostería del Camino Argentina',
  },
]

export interface TravelOption {
  icon: IconName
  title: Text
  text: Text
}

export const travel: TravelOption[] = [
  {
    icon: 'plane',
    title: { en: 'By plane', es: 'En avión' },
    text: {
      en: 'International flights land at Ezeiza (EZE) in Buenos Aires; most domestic flights leave from Aeroparque (AEP). We will share the nearest airport once the venue is confirmed.',
      es: 'Los vuelos internacionales llegan a Ezeiza (EZE), en Buenos Aires, y la mayoría de los de cabotaje salen de Aeroparque (AEP). Cuando confirmemos el lugar, te avisamos cuál es el aeropuerto más cercano.',
    },
  },
  {
    icon: 'bus',
    title: { en: 'By coach', es: 'En micro' },
    text: {
      en: 'Long-distance coaches are comfortable and good value. For overnight trips, book a “coche cama” seat.',
      es: 'Los micros de larga distancia son cómodos y accesibles. Para viajes de noche, sacá pasaje en coche cama.',
    },
  },
  {
    icon: 'car',
    title: { en: 'By car', es: 'En auto' },
    text: {
      en: 'Free parking at the estancia. If you plan to toast, take the shuttle — we will.',
      es: 'Hay estacionamiento gratis en la estancia. Si vas a brindar, usá el traslado; nosotros vamos a hacer lo mismo.',
    },
  },
  {
    icon: 'phone',
    title: { en: 'Taxis & remises', es: 'Taxis y remises' },
    text: {
      en: 'Remís Los Álamos: +54 9 11 0000-0000. Book your ride home in advance.',
      es: 'Remís Los Álamos: +54 9 11 0000-0000. Reservá la vuelta con anticipación.',
    },
  },
]

export interface ShuttleRun {
  time: string
  from: Text
  to: Text
}

const chapel: Text = { en: 'Chapel', es: 'Capilla' }
const estancia: Text = { en: 'Estancia', es: 'Estancia' }
const allHotels: Text = { en: 'All hotels', es: 'Todos los hoteles' }

export const shuttle: ShuttleRun[] = [
  { time: '18:00', from: { en: 'Hotel Plaza', es: 'Hotel Plaza' }, to: chapel },
  { time: '18:10', from: { en: 'Hostería del Camino', es: 'Hostería del Camino' }, to: chapel },
  { time: '20:00', from: chapel, to: estancia },
  { time: '01:30', from: estancia, to: allHotels },
  { time: '03:00', from: estancia, to: allHotels },
  { time: '05:00', from: estancia, to: allHotels },
]
