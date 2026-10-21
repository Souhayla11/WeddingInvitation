interface CalendarEvent {
  title: string
  start: string
  end: string
  location: string
  description: string
}

const icsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const escape = (value: string) => value.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n')

/** Downloads a one-event .ics file that every calendar app can import. */
export function downloadCalendarEvent(event: CalendarEvent, filename: string) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${icsDate(event.start)}-wedding@invitation`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(event.start)}`,
    `DTEND:${icsDate(event.end)}`,
    `SUMMARY:${escape(event.title)}`,
    `LOCATION:${escape(event.location)}`,
    `DESCRIPTION:${escape(event.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
