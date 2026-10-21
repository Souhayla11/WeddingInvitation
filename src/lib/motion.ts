export const ease = [0.22, 1, 0.36, 1] as const

/** Props for a motion element that rises into place the first time it scrolls into view. */
export function reveal(delay = 0, y = 28) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -12% 0px' },
    transition: { duration: 0.9, delay, ease },
  }
}

/** Fade up with a slight scale — reads more “designed” on cards and figures. */
export function revealScale(delay = 0, y = 24) {
  return {
    initial: { opacity: 0, y, scale: 0.96 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.85, delay, ease },
  }
}

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.35, ease } },
  whileTap: { scale: 0.98 },
}
