import type { SVGProps } from 'react'

// Hand-drawn-weight line icons on a 24px grid. Stroke colour follows `currentColor`.
const paths = {
  rings: (
    <>
      <circle cx="9" cy="14.5" r="5.5" />
      <circle cx="15" cy="14.5" r="5.5" />
      <path d="M12 3.5l2 2.5-2 2.5-2-2.5z" />
    </>
  ),
  church: <path d="M12 2v4M10 4h4M6.5 22V11.5L12 7l5.5 4.5V22M3.5 22h17M10 22v-3.5a2 2 0 0 1 4 0V22" />,
  bus: (
    <>
      <rect x="4" y="3" width="16" height="14" rx="2.5" />
      <path d="M4 10h16M8 17v3M16 17v3" />
      <circle cx="8" cy="13.5" r="0.8" />
      <circle cx="16" cy="13.5" r="0.8" />
    </>
  ),
  glass: <path d="M8 3h8l-.4 5a3.6 3.6 0 0 1-7.2 0zM12 11.6V20M8.5 20.5h7" />,
  dinner: <path d="M7 3v7a2 2 0 0 0 2 2v9M11 3v7a2 2 0 0 1-2 2M9 3v6M17.5 21V3c-1.8 1.2-2.8 3.6-2.8 6.5 0 2.6 1.1 3.5 2.8 3.5" />,
  music: (
    <>
      <path d="M9 18V5.5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16.5" r="2.5" />
    </>
  ),
  cup: <path d="M5 9.5h11V14a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 11h1.5a2.5 2.5 0 0 1 0 5H16M8.5 3c-.8 1.2.8 2-.2 3.5M12.5 3c-.8 1.2.8 2-.2 3.5" />,
  cake: (
    <path d="M3.5 21h17M5 21v-6h14v6M7.5 15v-4h9v4M5 17.5c1.2 1 2.3 1 3.5 0s2.3-1 3.5 0 2.3 1 3.5 0 2.3-1 3.5 0M12 11V8M12 4.5c-.8.9-.8 1.9 0 2.8.8-.9.8-1.9 0-2.8z" />
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />,
  plane: <path d="M21 15.5v-1.8l-8-5V3.5a1.5 1.5 0 0 0-3 0v5.2l-8 5v1.8l8-2.5v5.2l-2 1.5V21l3.5-1 3.5 1v-1.3l-2-1.5V13z" />,
  train: (
    <>
      <rect x="5.5" y="3" width="13" height="14" rx="3" />
      <path d="M5.5 10.5h13M9 17l-2 4M15 17l2 4" />
      <circle cx="9" cy="13.8" r="0.8" />
      <circle cx="15" cy="13.8" r="0.8" />
    </>
  ),
  car: (
    <>
      <path d="M3.5 16.5v-3.5l2.2-5.5h12.6l2.2 5.5v3.5zM5 16.5V19M19 16.5V19M3.5 13h17" />
      <circle cx="7.5" cy="14.8" r="0.6" />
      <circle cx="16.5" cy="14.8" r="0.6" />
    </>
  ),
  phone: <path d="M6.5 3.5h3l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />,
  pin: (
    <>
      <path d="M12 21.5s-7-6.2-7-11.8a7 7 0 0 1 14 0c0 5.6-7 11.8-7 11.8z" />
      <circle cx="12" cy="9.7" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  dress: <path d="M9.5 3h5l-1 4.5 4.5 13.5H6L10.5 7.5zM10.5 7.5h3" />,
  shirt: <path d="M8.5 3.5 3.5 6.5l2 4 2-1V20.5h9V9.5l2 1 2-4-5-3c0 1.8-1.4 3-3 3s-3-1.2-3-3z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  chat: <path d="M4 4.5h16v11.5H9.5L4 20.5z" />,
  gift: <path d="M3.5 8h17v4h-17zM5 12v9h14v-9M12 8v13M12 8c-1.8-4-5.5-4.2-5.5-2 0 1.7 3.2 2 5.5 2zm0 0c1.8-4 5.5-4.2 5.5-2 0 1.7-3.2 2-5.5 2z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.2 8.2 20 20M8.2 15.8 20 4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.8v.01" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  external: <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" />,
  leaf: <path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16zM4 20 13 11" />,
} as const

export type IconName = keyof typeof paths

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
