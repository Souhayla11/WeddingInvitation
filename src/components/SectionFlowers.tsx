import { motion } from 'motion/react'
import { flowerPlacements, type FlowerZone } from '../content/flowerPlacements'
import { Flower } from './Flower'
import styles from './SectionFlowers.module.css'

export function SectionFlowers({ zone }: { zone: FlowerZone }) {
  const items = flowerPlacements[zone]
  if (!items.length) return null

  return (
    <div className={styles.layer} aria-hidden="true">
      {items.map((item, i) => (
        <motion.div
          key={`${zone}-${i}`}
          className={styles.mark}
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            rotate: `${item.rotate}deg`,
            scale: item.scale ?? 1,
            opacity: item.opacity ?? 0.3,
          }}
          initial={{ opacity: 0, scale: (item.scale ?? 1) * 0.85 }}
          whileInView={{ opacity: item.opacity ?? 0.3, scale: item.scale ?? 1 }}
          viewport={{ once: true, margin: '-5% 0px -5% 0px' }}
          transition={{ duration: 0.85, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <Flower variant={item.variant} tone={item.tone} />
        </motion.div>
      ))}
    </div>
  )
}
