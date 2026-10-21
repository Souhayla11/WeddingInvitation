import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { Section } from '../components/Section'
import { schedule } from '../content/schedule'
import { useLang } from '../i18n/LanguageContext'
import { reveal } from '../lib/motion'
import styles from './Schedule.module.css'

export function Schedule() {
  const { t } = useLang()
  const timeline = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 65%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <Section id="schedule" tone="paper">
      <div className={styles.wrap}>
        <span className={styles.track} aria-hidden="true">
          <motion.span className={styles.fill} style={{ scaleY: progress }} />
        </span>
        <ol className={styles.list} ref={timeline}>
          {schedule.map((item, i) => (
            <motion.li key={item.time} className={styles.item} {...reveal(i * 0.06, 32)}>
              <time className={styles.time}>{item.time}</time>
              <span className={styles.node}>
                <Icon name={item.icon} />
              </span>
              <div className={styles.body}>
                <h3 className={styles.title}>{t(item.title)}</h3>
                <p className={styles.text}>{t(item.text)}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
