// FAQs are grouped into tabs. Add a new tab by adding a category to the list below.
import type { IconName } from '../components/Icon'
import type { Text } from '../i18n/types'

export interface Question {
  q: Text
  a: Text
}

export interface Place {
  name: string
  area: Text
  text: Text
  /** Short extra detail, e.g. price or opening days. */
  tag?: Text
  mapQuery: string
}

interface CategoryBase {
  id: string
  icon: IconName
  label: Text
}

export type FaqCategory =
  | (CategoryBase & { kind: 'questions'; items: Question[] })
  | (CategoryBase & { kind: 'places'; items: Place[] })

const inTown: Text = { en: 'In town', es: 'En el pueblo' }

export const faqCategories: FaqCategory[] = [
  {
    id: 'good-to-know',
    icon: 'info',
    label: { en: 'Good to know', es: 'Información útil' },
    kind: 'questions',
    items: [
      {
        q: { en: 'Can I bring a plus-one?', es: '¿Puedo ir con acompañante?' },
        a: {
          en: 'Your invitation names everyone we have saved a seat for. If it says “and guest”, bring whoever you like.',
          es: 'En tu invitación figuran todas las personas para las que reservamos lugar. Si dice “y acompañante”, ¡traé a quien quieras!',
        },
      },
      {
        q: { en: 'Are children welcome?', es: '¿Pueden ir chicos?' },
        a: {
          en: 'We love your little ones, but the celebration is adults-only — apart from the nieces and nephews in the wedding party.',
          es: 'Nos encantan los chicos, pero la fiesta es solo para adultos, salvo los sobrinos que forman parte del cortejo.',
        },
      },
      {
        q: { en: 'What about gifts?', es: '¿Y los regalos?' },
        a: {
          en: 'Truly, having you there is enough. If you would like to give something, there will be a box for envelopes at the party, or write to us for bank details.',
          es: 'De verdad, con que vengas alcanza. Si querés hacernos un regalo, en la fiesta va a haber una urna para sobres, o escribinos y te pasamos los datos bancarios.',
        },
      },
      {
        q: { en: 'Can I take photos?', es: '¿Puedo sacar fotos?' },
        a: {
          en: 'The ceremony is unplugged, so please keep phones away. At the party, snap away and share with #DaniellaYJose.',
          es: 'La ceremonia es sin celulares, así que te pedimos que lo guardes. En la fiesta, sacá todas las fotos que quieras y compartilas con #DaniellaYJose.',
        },
      },
      {
        q: { en: 'Should I bring cash?', es: '¿Conviene llevar efectivo?' },
        a: {
          en: 'Cards work almost everywhere, but carry some pesos for taxis and tips.',
          es: 'Con tarjeta podés pagar casi todo, pero llevá algo de efectivo en pesos para taxis y propinas.',
        },
      },
      {
        q: { en: 'Will there be vegetarian options?', es: '¿Va a haber opciones vegetarianas?' },
        a: {
          en: 'Yes, and gluten-free too. Tell us about any dietary needs or allergies in the RSVP form and the kitchen will look after you.',
          es: 'Sí, y también sin TACC. Contanos tus alergias o restricciones en el formulario de confirmación y la cocina se encarga.',
        },
      },
      {
        q: { en: 'When do I need to reply by?', es: '¿Hasta cuándo puedo confirmar?' },
        a: {
          en: 'Please send your RSVP by 15 January 2027 so we can confirm numbers with the venue.',
          es: 'Confirmanos antes del 15 de enero de 2027 así cerramos números con la estancia.',
        },
      },
    ],
  },
  {
    id: 'things-to-do',
    icon: 'compass',
    label: { en: 'Things to do', es: 'Qué hacer' },
    kind: 'places',
    items: [
      {
        name: 'San Telmo',
        area: { en: 'Buenos Aires', es: 'Buenos Aires' },
        text: {
          en: 'Cobbled streets, the Sunday antiques fair and tango dancers in Plaza Dorrego.',
          es: 'Calles empedradas, la feria de antigüedades de los domingos y tango en la Plaza Dorrego.',
        },
        tag: { en: 'Sundays', es: 'Domingos' },
        mapQuery: 'San Telmo Buenos Aires',
      },
      {
        name: 'Café Tortoni',
        area: { en: 'Buenos Aires', es: 'Buenos Aires' },
        text: {
          en: 'The city’s most famous café, open since 1858. Stay for the evening tango show.',
          es: 'El café más famoso de la ciudad, abierto desde 1858. Quedate al show de tango de la noche.',
        },
        tag: { en: 'Evening', es: 'De noche' },
        mapQuery: 'Café Tortoni Buenos Aires',
      },
      {
        name: 'Valle de Uco',
        area: { en: 'Mendoza', es: 'Mendoza' },
        text: {
          en: 'Vineyards at the foot of the Andes. March is harvest season, so book a winery tasting.',
          es: 'Viñedos al pie de la cordillera. Marzo es época de vendimia: reservá una degustación en alguna bodega.',
        },
        tag: { en: 'Full day', es: 'Día completo' },
        mapQuery: 'Valle de Uco Mendoza',
      },
      {
        name: 'Cataratas del Iguazú',
        area: { en: 'Misiones · ≈ 2 h flight', es: 'Misiones · ≈ 2 h de vuelo' },
        text: {
          en: 'If you are extending your trip, the falls are unforgettable. Allow two days.',
          es: 'Si alargás el viaje, las cataratas son inolvidables. Reservale dos días.',
        },
        tag: { en: '2 days', es: '2 días' },
        mapQuery: 'Cataratas del Iguazú',
      },
    ],
  },
  {
    id: 'hair-beauty',
    icon: 'scissors',
    label: { en: 'Hair & beauty', es: 'Peluquerías' },
    kind: 'places',
    items: [
      {
        name: 'Estudio Malva',
        area: inTown,
        text: {
          en: 'Updos, blow-dries and styling for groups. Book at least a month ahead.',
          es: 'Recogidos, brushing y peinados para grupos. Reservá turno con un mes de anticipación como mínimo.',
        },
        tag: { en: 'Closed Mondays', es: 'Cierra los lunes' },
        mapQuery: 'Peluquería Argentina',
      },
      {
        name: 'Belleza Lavanda',
        area: inTown,
        text: {
          en: 'Make-up and nails. They can come to your hotel on the day of the wedding.',
          es: 'Maquillaje y uñas. Pueden ir a tu hotel el día de la boda.',
        },
        tag: { en: 'Home visits', es: 'A domicilio' },
        mapQuery: 'Maquillaje Argentina',
      },
      {
        name: 'Barbería Don Ramón',
        area: inTown,
        text: {
          en: 'Classic cuts and hot-towel shaves. Walk-ins welcome on weekday mornings.',
          es: 'Cortes clásicos y afeitado con toalla caliente. Sin turno entre semana a la mañana.',
        },
        tag: { en: 'Walk-ins', es: 'Sin turno' },
        mapQuery: 'Barbería Argentina',
      },
    ],
  },
  {
    id: 'where-to-eat',
    icon: 'dinner',
    label: { en: 'Where to eat', es: 'Dónde comer' },
    kind: 'places',
    items: [
      {
        name: 'Parrilla La Tranquera',
        area: inTown,
        text: {
          en: 'Proper Argentine asado. Order the ojo de bife and a provoleta to share.',
          es: 'Asado como corresponde. Pedí un ojo de bife y una provoleta para compartir.',
        },
        tag: { en: '$$', es: '$$' },
        mapQuery: 'Parrilla Argentina',
      },
      {
        name: 'Bodegón El Fogón',
        area: inTown,
        text: {
          en: 'Huge milanesas and homemade pasta, the way grandma made them.',
          es: 'Milanesas enormes y pastas caseras, como las de la abuela.',
        },
        tag: { en: '$', es: '$' },
        mapQuery: 'Bodegón Argentina',
      },
      {
        name: 'Café La Esquina',
        area: inTown,
        text: {
          en: 'Breakfast done right: medialunas and café con leche.',
          es: 'Desayunos como corresponde: medialunas y café con leche.',
        },
        tag: { en: '$', es: '$' },
        mapQuery: 'Café Argentina',
      },
      {
        name: 'Heladería La Nonna',
        area: inTown,
        text: {
          en: 'Dulce de leche ice cream. You will go back twice.',
          es: 'Helado de dulce de leche. Vas a volver dos veces.',
        },
        tag: { en: '$', es: '$' },
        mapQuery: 'Heladería Argentina',
      },
    ],
  },
]
