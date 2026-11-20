import { motion, useScroll, useTransform } from 'motion/react'
import heroArt from '../../designs/ILUSTRACION INVITACION.png'
import styles from './HeroBackground.module.css'

/** Full-bleed hero art from designs/ILUSTRACION INVITACION.png */
export function HeroBackground({ play }: { play: boolean }) {
  // The drawing drifts a little slower than the page, so the hero has depth.
  const { scrollY } = useScroll()
  const drift = useTransform(scrollY, [0, 700], [0, 64])

  return (
    <div className={styles.wrap} aria-hidden="true">
      <motion.img
        className={styles.image}
        style={{ y: drift }}
        src={heroArt}
        alt=""
        initial={{ opacity: 0, scale: 1.04 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
