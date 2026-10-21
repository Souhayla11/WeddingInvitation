import { Fragment, type ReactNode } from 'react'

/** Turns "Wedding *details*" into "Wedding <em>details</em>". */
export function emphasis(text: string): ReactNode {
  return text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>))
}

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '')
}

export const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase() + s.slice(1)
