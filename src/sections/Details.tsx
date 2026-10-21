import { motion } from 'motion/react'
import { Icon } from '../components/Icon'
import { Section } from '../components/Section'
import { details } from '../content/ui'
import { detailNotes, mapsUrl, venues, weddingEnd, weddingStart } from '../content/wedding'
import { useLang } from '../i18n/LanguageContext'
import { downloadCalendarEvent } from '../lib/calendar'
import { hoverLift, reveal } from '../lib/motion'
import styles from './Details.module.css'

export function Details() {
  const { t } = useLang()

  const addToCalendar = () =>
    downloadCalendarEvent(
      {
        title: t(details.calendarTitle),
        start: weddingStart,
        end: weddingEnd,
        location: `${venues[0].name}, ${t(venues[0].address)}`,
        description: venues.map((v) => `${v.time} ${t(v.kind)} — ${v.name}`).join('\n'),
      },
      'daniella-jose-wedding.ics',
    )

  return (
    <Section id="details">
      <div className={styles.venues}>
        {venues.map((venue, i) => (
          <motion.article key={venue.name} className={styles.venue} {...reveal(i * 0.12, 40)} {...hoverLift}>
            <p className={styles.kind}>{t(venue.kind)}</p>
            <p className={styles.time}>{venue.time}</p>
            <h3 className={styles.name}>{venue.name}</h3>
            <p className={styles.address}>{t(venue.address)}</p>
            <p className={styles.note}>{t(venue.note)}</p>
            <a className="text-link" href={mapsUrl(venue.mapQuery)} target="_blank" rel="noreferrer">
              {t(details.directions)}
              <Icon name="external" />
            </a>
          </motion.article>
        ))}
      </div>

      <ul className={styles.notes}>
        {detailNotes.map((note, i) => (
          <motion.li key={note.icon} className={styles.noteItem} {...reveal(i * 0.08)}>
            <span className={styles.noteIcon}>
              <Icon name={note.icon} />
            </span>
            <h3 className={styles.noteTitle}>{t(note.title)}</h3>
            <p className={styles.noteText}>{t(note.text)}</p>
          </motion.li>
        ))}
      </ul>

      <motion.div className={styles.calendar} {...reveal()}>
        <button type="button" className="btn btn-outline" onClick={addToCalendar}>
          <Icon name="calendar" />
          {t(details.calendar)}
        </button>
      </motion.div>
    </Section>
  )
}
