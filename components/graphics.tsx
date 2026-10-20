import type { SVGProps } from 'react'

export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M50 0c3 26 21 44 47 50-26 3-44 21-47 50-3-29-21-47-47-50C29 44 47 26 50 0Z" />
    </svg>
  )
}

export function OrbitLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="200" cy="100" rx="196" ry="78" transform="rotate(-18 200 100)" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`font-display leading-none tracking-tight ${className ?? ''}`}>
      DF<span className="italic">Wearing</span>
    </span>
  )
}
