import { motion } from 'motion/react'
import { Icon, type IconName } from '../components/Icon'
import { Section } from '../components/Section'
import { gettingAround, gettingThere, stayAreas, type TravelOption } from '../content/stay'
import { stay } from '../content/ui'
import type { Text } from '../i18n/types'
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
        {stayAreas.map((area, i) => (
          <motion.li key={area.name} className={styles.hotel} {...reveal(i * 0.1, 36)}>
            <h4 className={styles.hotelName}>{area.name}</h4>
            {area.options && (
              <ul className={styles.options}>
                {area.options.map((option) => (
                  <li key={option.name} className={styles.option}>
                    <div>
                      <p className={styles.optionName}>{option.name}</p>
                      {option.note && <p className={styles.optionNote}>{t(option.note)}</p>}
                    </div>
                    <a className="text-link" href={option.href} target="_blank" rel="noreferrer">
                      {t(option.linkLabel)}
                      <Icon name="external" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <p className={styles.hotelText}>{t(area.text)}</p>
          </motion.li>
        ))}
      </ul>

      <div className={styles.transport}>
        <div className={styles.travelGroups}>
          <TravelGroup icon="plane" title={stay.thereTitle} items={gettingThere} />
          <TravelGroup icon="compass" title={stay.aroundTitle} items={gettingAround} />
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
        </motion.div>
      </div>
    </Section>
  )
}

function TravelGroup({ icon, title, items }: { icon: IconName; title: Text; items: TravelOption[] }) {
  const { t } = useLang()
  return (
    <div>
      <motion.h3 className={styles.subhead} {...reveal()}>
        <Icon name={icon} />
        {t(title)}
      </motion.h3>
      <ul className={styles.travel}>
        {items.map((option, i) => (
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
  )
}
