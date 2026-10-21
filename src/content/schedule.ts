import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

export interface ScheduleItem {
  time: string
  icon: IconName
  title: Text
  text: Text
}

export const schedule: ScheduleItem[] = [
  {
    time: '18:30',
    icon: 'church',
    title: { en: 'Guests arrive', es: 'Llegada de invitados' },
    text: {
      en: 'Find a seat at Capilla Santa Rosa. Cold water and fans are waiting at the door.',
      es: 'Buscá tu lugar en la Capilla Santa Rosa. Va a haber agua fresca y abanicos en la puerta.',
    },
  },
  {
    time: '19:00',
    icon: 'rings',
    title: { en: 'Ceremony', es: 'Ceremonia' },
    text: {
      en: 'We say “sí, quiero” — and “I do”. Phones away, please; our photographer has it covered.',
      es: 'Nos damos el “sí, quiero” (y el “I do”). Guardá el celular, que la fotógrafa se encarga.',
    },
  },
  {
    time: '20:00',
    icon: 'bus',
    title: { en: 'Shuttle to the estancia', es: 'Traslado a la estancia' },
    text: {
      en: 'Buses leave from the chapel door. The ride takes about 15 minutes.',
      es: 'Los micros salen desde la puerta de la capilla. El viaje dura unos 15 minutos.',
    },
  },
  {
    time: '20:30',
    icon: 'glass',
    title: { en: 'Cocktail hour', es: 'Recepción' },
    text: {
      en: 'Empanadas, Malbec and live music in the garden as the sun goes down.',
      es: 'Empanadas, Malbec y música en vivo en el jardín mientras cae el sol.',
    },
  },
  {
    time: '22:00',
    icon: 'dinner',
    title: { en: 'Dinner', es: 'Cena' },
    text: {
      en: 'Dinner under the galería, with a few short speeches between courses.',
      es: 'Cena en la galería, con algún brindis corto entre plato y plato.',
    },
  },
  {
    time: '23:30',
    icon: 'music',
    title: { en: 'The waltz & party', es: 'Vals y fiesta' },
    text: {
      en: 'We open the dance floor with the waltz. Then it is all yours — bring comfortable shoes.',
      es: 'Abrimos la pista con el vals y después es toda de ustedes. Traé zapatos cómodos.',
    },
  },
  {
    time: '02:00',
    icon: 'sparkle',
    title: { en: 'Hora loca', es: 'Hora loca' },
    text: {
      en: 'Masks, hats and confetti — the most Argentine half hour of the night.',
      es: 'Máscaras, sombreros y papel picado: la media hora más argentina de la noche.',
    },
  },
  {
    time: '04:00',
    icon: 'cup',
    title: { en: 'Late-night snack', es: 'Fin de fiesta' },
    text: {
      en: 'Medialunas and coffee (or a choripán) to send everyone home happy.',
      es: 'Medialunas con café (o un choripán) para volver a casa contentos.',
    },
  },
  {
    time: '05:00',
    icon: 'moon',
    title: { en: 'Last shuttle', es: 'Último traslado' },
    text: {
      en: 'The final bus back to the hotels. Earlier buses leave at 01:30 and 03:00.',
      es: 'El último micro a los hoteles. Hay otros a la 01:30 y a las 03:00.',
    },
  },
]
