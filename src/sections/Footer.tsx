import { motion } from 'motion/react'
import design1Art from '../../designs/design1.jpeg'
import { Seal } from '../components/Seal'
import { footer } from '../content/ui'
import { contactEmail, couple, dateShort, hashtag, location } from '../content/wedding'
import { useLang } from '../i18n/LanguageContext'
import { SectionFlowers } from '../components/SectionFlowers'
import { reveal } from '../lib/motion'
import styles from './Footer.module.css'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className={styles.footer}>
      <img className={styles.designBg} src={design1Art} alt="" aria-hidden="true" />
      <SectionFlowers zone="footer" />
      <motion.div className={styles.inner} {...reveal()}>
        <Seal size={72} />
        <p className={styles.love}>{t(footer.love)},</p>
        <p className={styles.names}>
          {couple.one} <span>&amp;</span> {couple.two}
        </p>
        <p className={styles.meta}>
          {dateShort} — {t(location)} — {hashtag}
        </p>
        <p className={styles.contact}>
          {t(footer.questions)} <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
        <a className={styles.top} href="#top">
          {t(footer.top)} ↑
        </a>
      </motion.div>
    </footer>
  )
}
