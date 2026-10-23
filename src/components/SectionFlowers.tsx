import { motion } from 'motion/react'
import design1Art from '../../designs/design1.jpeg'
import { design1ObjectPosition, templateDecor, type DecorZone } from '../content/templateDecor'
import { WatercolorFlower } from './Flower'
import styles from './SectionFlowers.module.css'

export function SectionFlowers({ zone }: { zone: DecorZone }) {
  const items = templateDecor[zone]
  if (!items.length) return null

  return (
    <div className={styles.layer} data-zone={zone} aria-hidden="true">
      {items.map((item, i) => (
        <motion.div
          key={`${zone}-${item.kind}-${i}`}
          className={item.kind === 'design1' ? styles.designMark : styles.flowerMark}
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            rotate: `${item.rotate}deg`,
            scale: item.scale ?? 1,
            opacity: item.opacity ?? 0.35,
            ...(item.kind === 'design1' ? { width: item.size, height: item.size } : {}),
          }}
          initial={{ opacity: 0, scale: (item.scale ?? 1) * 0.88 }}
          whileInView={{ opacity: item.opacity ?? 0.35, scale: item.scale ?? 1 }}
          viewport={{ once: true, margin: '-4% 0px -4% 0px' }}
          transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          {item.kind === 'design1' ? (
            <img
              className={styles.designImg}
              src={design1Art}
              alt=""
              style={{ objectPosition: design1ObjectPosition(item.focus) }}
            />
          ) : (
            <WatercolorFlower variant={item.variant} tone={item.tone} />
          )}
        </motion.div>
      ))}
    </div>
  )
}
