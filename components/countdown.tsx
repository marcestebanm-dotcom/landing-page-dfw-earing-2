'use client'

import { useEffect, useState } from 'react'

const LAUNCH_DATE = new Date('2026-10-15T10:00:00')

function getRemaining() {
  const diff = LAUNCH_DATE.getTime() - Date.now()
  const clamped = Math.max(diff, 0)
  return {
    dias: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    horas: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    min: Math.floor((clamped / (1000 * 60)) % 60),
    seg: Math.floor((clamped / 1000) % 60),
    done: diff <= 0,
  }
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getRemaining> | null>(null)

  useEffect(() => {
    setTime(getRemaining())
    const id = setInterval(() => setTime(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const units: [string, number][] = [
    ['Days', time?.dias ?? 0],
    ['Hours', time?.horas ?? 0],
    ['Min', time?.min ?? 0],
    ['Sec', time?.seg ?? 0],
  ]

  return (
    <div
      className="flex gap-2.5 sm:gap-4"
      role="timer"
      aria-label="Countdown to the October 15 launch"
    >
      {units.map(([label, value]) => (
        <div
          key={label}
          className="flex min-w-[64px] flex-col items-center rounded-2xl border border-dfw-blue/20 bg-soft-cream px-3 py-3 sm:min-w-[84px] sm:px-4 sm:py-4"
        >
          <span className="font-display text-4xl leading-none text-deep-blue tabular-nums sm:text-5xl">
            {String(value).padStart(2, '0')}
          </span>
          <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
