// Interface copy: headings, buttons, labels and form messages.
// Spanish is Argentine (rioplatense): vos, ustedes, celular, micro, auto.
import type { SectionId } from './sections'
import type { Text } from '../i18n/types'

export const meta = {
  title: {
    en: 'Daniella & José · 12 March 2027',
    es: 'Daniella y José · 12 de marzo de 2027',
  },
  description: {
    en: 'We are getting married in Argentina. Everything you need for the weekend, and your RSVP.',
    es: 'Nos casamos en Argentina. Todo lo que necesitás para el fin de semana y tu confirmación.',
  },
} satisfies Record<string, Text>

export const nav = {
  label: { en: 'Sections', es: 'Secciones' },
  menu: { en: 'Menu', es: 'Menú' },
  close: { en: 'Close', es: 'Cerrar' },
  language: { en: 'Language', es: 'Idioma' },
  home: { en: 'Back to the top', es: 'Volver arriba' },
  skip: { en: 'Skip to content', es: 'Ir al contenido' },
} satisfies Record<string, Text>

export const envelope = {
  kicker: { en: 'You are invited', es: 'Te invitamos' },
  cardLine: { en: 'Together with their families', es: 'Junto a sus familias' },
  open: { en: 'Open the invitation', es: 'Abrir la invitación' },
  hintTouch: { en: 'Tap the seal to open', es: 'Tocá el sello para abrir' },
  hintPointer: { en: 'Click the seal to open', es: 'Hacé clic en el sello para abrir' },
} satisfies Record<string, Text>

export const hero = {
  eyebrow: { en: 'We are getting married', es: '¡Nos casamos!' },
  units: {
    days: { en: 'Days', es: 'Días' },
    hours: { en: 'Hours', es: 'Horas' },
    minutes: { en: 'Minutes', es: 'Minutos' },
    seconds: { en: 'Seconds', es: 'Segundos' },
  },
  countdownLabel: { en: 'Time until the ceremony', es: 'Tiempo hasta la ceremonia' },
  married: { en: 'Just married — thank you for celebrating with us.', es: 'Recién casados. Gracias por festejar con nosotros.' },
  rsvp: { en: 'RSVP', es: 'Confirmar asistencia' },
  schedule: { en: 'See the schedule', es: 'Ver el cronograma' },
  scroll: { en: 'Scroll', es: 'Deslizá' },
} satisfies Record<string, Text | Record<string, Text>>

interface SectionCopy {
  /** Small line above the title. Carries a real fact rather than repeating the title. */
  eyebrow: Text
  /** Wrap a word in *asterisks* to set it in italics. */
  title: Text
  intro?: Text
}

export const sectionCopy: Record<SectionId, SectionCopy> = {
  details: {
    eyebrow: { en: 'Friday 12 March 2027', es: 'Viernes 12 de marzo de 2027' },
    title: { en: 'Wedding *details*', es: 'Detalles de la *boda*' },
    intro: {
      en: 'Two places, one night. The ceremony is at the chapel; the celebration follows at the estancia, a short ride away.',
      es: 'Dos lugares y una sola noche. La ceremonia es en la capilla y la fiesta sigue en la estancia, a pocos minutos.',
    },
  },
  schedule: {
    eyebrow: { en: 'From 18:30 until sunrise', es: 'De 18:30 hasta que salga el sol' },
    title: { en: 'The day, *hour by hour*', es: 'El día, *hora a hora*' },
    intro: {
      en: 'Timings are a guide — this is Argentina, and the party runs late. Shuttle times are fixed, though.',
      es: 'Los horarios son orientativos: es Argentina y la fiesta termina tarde. Los del traslado, eso sí, son fijos.',
    },
  },
  recovery: {
    eyebrow: { en: 'Saturday 13 March', es: 'Sábado 13 de marzo' },
    title: { en: 'Recovery *dinner*', es: 'Cena del *día después*' },
    intro: {
      en: 'Not ready for it to end? Neither are we. Join us the next evening for a slow, casual asado.',
      es: '¿Te quedaste con ganas de más? Nosotros también. Vení la noche siguiente a un asado tranquilo e informal.',
    },
  },
  stay: {
    eyebrow: { en: 'Near Estancia Los Álamos', es: 'Cerca de la Estancia Los Álamos' },
    title: { en: 'Accommodation *& transport*', es: 'Alojamiento *y traslados*' },
    intro: {
      en: 'We have saved rooms at three places near the estancia. Stay at any of them and the wedding shuttle will do the rest.',
      es: 'Reservamos habitaciones en tres lugares cerca de la estancia. Alojate en cualquiera y el traslado de la boda se encarga del resto.',
    },
  },
  faq: {
    eyebrow: { en: 'Good to know', es: 'Para que no te falte nada' },
    title: { en: 'Questions *& local tips*', es: 'Preguntas *y consejos*' },
    intro: {
      en: 'Practical answers, plus our favourite places to visit, get ready and eat.',
      es: 'Respuestas prácticas y nuestros lugares favoritos para pasear, arreglarse y comer.',
    },
  },
  rsvp: {
    eyebrow: { en: 'Please reply by 15 January 2027', es: 'Confirmá antes del 15 de enero de 2027' },
    title: { en: 'Will you *join us*?', es: '¿Nos *acompañás*?' },
    intro: {
      en: 'One reply per invitation is perfect. You can send another if your plans change.',
      es: 'Con una respuesta por invitación alcanza. Si cambian tus planes, podés mandar otra.',
    },
  },
}

export const details = {
  directions: { en: 'Get directions', es: 'Cómo llegar' },
  calendar: { en: 'Add to calendar', es: 'Agregar al calendario' },
  calendarTitle: { en: 'Daniella & José’s wedding', es: 'Boda de Daniella y José' },
} satisfies Record<string, Text>

export const recoveryTags = {
  asado: { en: 'Asado', es: 'Asado' },
  malbec: { en: 'Malbec', es: 'Malbec' },
  quincho: { en: 'Quincho', es: 'Quincho' },
} satisfies Record<string, Text>

export const recovery = {
  script: { en: 'the day after', es: 'el día después' },
  note: {
    en: 'Let us know in the RSVP form if you are coming, so we save you a chair.',
    es: 'Avisanos en el formulario de confirmación así te guardamos un lugar.',
  },
  directions: { en: 'Get directions', es: 'Cómo llegar' },
} satisfies Record<string, Text>

export const stay = {
  hotelsTitle: { en: 'Where to stay', es: 'Dónde alojarse' },
  code: { en: 'Guest code', es: 'Código' },
  map: { en: 'View on map', es: 'Ver en el mapa' },
  travelTitle: { en: 'Getting here', es: 'Cómo llegar' },
  shuttleTitle: { en: 'Wedding shuttle', es: 'Traslado de la boda' },
  shuttleText: {
    en: 'Free for all guests. No need to book — just tell us in the RSVP so we get the right size bus.',
    es: 'Gratis para todos los invitados. No hace falta reservar: indicalo en la confirmación así calculamos el tamaño del micro.',
  },
  shuttleDate: { en: 'Fri 12 Mar', es: 'Vie 12 mar' },
  departs: { en: 'Departs', es: 'Salida' },
  route: { en: 'Route', es: 'Recorrido' },
} satisfies Record<string, Text>

export const faq = {
  tabsLabel: { en: 'FAQ topics', es: 'Temas' },
  map: { en: 'Map', es: 'Mapa' },
  more: {
    en: 'Can’t find what you need? Write to us at',
    es: '¿No encontrás lo que buscás? Escribinos a',
  },
} satisfies Record<string, Text>

export const rsvp = {
  name: { en: 'Full name', es: 'Nombre y apellido' },
  namePlaceholder: { en: 'As it appears on your invitation', es: 'Como figura en tu invitación' },
  email: { en: 'Email', es: 'Email' },
  emailHint: { en: 'We will only use it to send updates about the wedding.', es: 'Solo lo vamos a usar para mandarte novedades de la boda.' },
  attending: { en: 'Can you come?', es: '¿Podés venir?' },
  yes: { en: 'Joyfully accepts', es: 'Acepta con alegría' },
  yesSub: { en: 'See you in March', es: 'Nos vemos en marzo' },
  no: { en: 'Regretfully declines', es: 'Lamenta no poder ir' },
  noSub: { en: 'We will toast to you', es: 'Vamos a brindar por vos' },
  guests: { en: 'Guests, including you', es: 'Personas, contándote a vos' },
  fewer: { en: 'One fewer guest', es: 'Una persona menos' },
  more: { en: 'One more guest', es: 'Una persona más' },
  recovery: { en: 'Joining the recovery dinner on Saturday?', es: '¿Venís a la cena del día después?' },
  shuttle: { en: 'Taking the wedding shuttle?', es: '¿Vas a usar el traslado de la boda?' },
  optionYes: { en: 'Yes', es: 'Sí' },
  optionNo: { en: 'No', es: 'No' },
  dietary: { en: 'Allergies or dietary needs', es: 'Alergias o restricciones alimentarias' },
  dietaryPlaceholder: { en: 'e.g. vegetarian, gluten-free', es: 'p. ej. vegetariano, sin TACC' },
  song: { en: 'A song that will get you dancing', es: 'Un tema que te haga bailar' },
  message: { en: 'A note for us', es: 'Unas palabras para nosotros' },
  optional: { en: 'optional', es: 'opcional' },
  submit: { en: 'Send RSVP', es: 'Enviar confirmación' },
  sending: { en: 'Sending…', es: 'Enviando…' },
  errorName: { en: 'Add your name so we know who is replying.', es: 'Escribí tu nombre así sabemos quién responde.' },
  errorEmail: { en: 'Enter an email like name@example.com.', es: 'Escribí un email como nombre@ejemplo.com.' },
  errorAttending: { en: 'Choose whether you can come.', es: 'Contanos si vas a poder venir.' },
  errorSend: {
    en: 'Your RSVP did not send. Check your connection and try again.',
    es: 'No se pudo enviar la confirmación. Revisá tu conexión y probá de nuevo.',
  },
  thanksYes: { en: 'See you in March, {name}!', es: '¡Nos vemos en marzo, {name}!' },
  thanksYesText: {
    en: 'Your RSVP is in. We will email you closer to the date with any updates.',
    es: 'Recibimos tu confirmación. Te vamos a escribir cuando se acerque la fecha.',
  },
  thanksNo: { en: 'We will miss you, {name}.', es: 'Te vamos a extrañar, {name}.' },
  thanksNoText: {
    en: 'Thank you for letting us know. We will raise a glass to you.',
    es: 'Gracias por avisarnos. Vamos a brindar por vos.',
  },
  another: { en: 'Send another RSVP', es: 'Enviar otra confirmación' },
} satisfies Record<string, Text>

export const footer = {
  questions: { en: 'Questions? Write to us at', es: '¿Dudas? Escribinos a' },
  top: { en: 'Back to the top', es: 'Volver arriba' },
  love: { en: 'With love', es: 'Con cariño' },
} satisfies Record<string, Text>
