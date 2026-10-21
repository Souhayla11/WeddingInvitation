import { motion } from 'motion/react'
import { Icon } from '../components/Icon'
import { Section } from '../components/Section'
import { hotels, shuttle, travel } from '../content/stay'
import { stay } from '../content/ui'
import { mapsUrl } from '../content/wedding'
import { useLang } from '../i18n/LanguageContext'
import { reveal } from '../lib/motion'
import styles from './Stay.module.css'

export function Stay() {
  const { t } = useLang()

  return (
    <Section id="stay" tone="paper">
      <motion.h3 className={styles.subhead} {...reveal()}>
        <Icon name="pin" />
        {t(stay.hotelsTitle)}
      </motion.h3>
      <ul className={styles.hotels}>
        {hotels.map((hotel, i) => (
          <motion.li key={hotel.name} className={styles.hotel} {...reveal(i * 0.1, 36)}>
            <div className={styles.hotelTop}>
              <span className={styles.tag}>{t(hotel.tag)}</span>
              <span className={styles.price}>
                {hotel.price}
                <span aria-hidden="true">{'$$$'.slice(hotel.price.length)}</span>
              </span>
            </div>
            <h4 className={styles.hotelName}>{hotel.name}</h4>
            <p className={styles.distance}>{t(hotel.distance)}</p>
            <p className={styles.hotelText}>{t(hotel.text)}</p>
            <div className={styles.hotelFoot}>
              {hotel.code && (
                <p className={styles.code}>
                  <span>{t(stay.code)}</span>
                  <strong>{hotel.code}</strong>
                </p>
              )}
              <a className="text-link" href={mapsUrl(hotel.mapQuery)} target="_blank" rel="noreferrer">
                {t(stay.map)}
                <Icon name="external" />
              </a>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className={styles.transport}>
        <div>
          <motion.h3 className={styles.subhead} {...reveal()}>
            <Icon name="compass" />
            {t(stay.travelTitle)}
          </motion.h3>
          <ul className={styles.travel}>
            {travel.map((option, i) => (
              <motion.li key={option.icon} className={styles.travelItem} {...reveal(i * 0.08)}>
                <span className={styles.travelIcon}>
                  <Icon name={option.icon} />
                </span>
                <div>
                  <h4 className={styles.travelTitle}>{t(option.title)}</h4>
                  <p className={styles.travelText}>{t(option.text)}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div className={styles.ticket} {...reveal(0.1, 40)}>
          <div className={styles.ticketHead}>
            <Icon name="bus" />
            <div>
              <h3 className={styles.ticketTitle}>{t(stay.shuttleTitle)}</h3>
              <p className={styles.ticketDate}>{t(stay.shuttleDate)}</p>
            </div>
          </div>
          <p className={styles.ticketText}>{t(stay.shuttleText)}</p>
          <div className={styles.perforation} aria-hidden="true" />
          <table className={styles.timetable}>
            <thead>
              <tr>
                <th scope="col">{t(stay.departs)}</th>
                <th scope="col">{t(stay.route)}</th>
              </tr>
            </thead>
            <tbody>
              {shuttle.map((run) => (
                <tr key={run.time}>
                  <td className={styles.runTime}>{run.time}</td>
                  <td>
                    {t(run.from)} <Icon name="arrow" className={styles.runArrow} /> {t(run.to)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </Section>
  )
}
