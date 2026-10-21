import { useEffect, useState } from 'react'

export interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function remainingUntil(target: number): Remaining {
  const diff = Math.max(0, target - Date.now())
  const s = Math.floor(diff / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: diff === 0,
  }
}

export function useCountdown(targetIso: string): Remaining {
  const target = new Date(targetIso).getTime()
  const [remaining, setRemaining] = useState(() => remainingUntil(target))

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(remainingUntil(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return remaining
}
