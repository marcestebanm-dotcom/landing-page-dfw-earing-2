'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function HalloweenCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Target: October 31 23:59:59 of current year
    const now = new Date()
    const currentYear = now.getFullYear()
    let target = new Date(currentYear, 9, 31, 23, 59, 59).getTime()

    // If past, target next year
    if (now.getTime() > target) {
      target = new Date(currentYear + 1, 9, 31, 23, 59, 59).getTime()
    }

    const updateCountdown = () => {
      const difference = target - new Date().getTime()
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-3">
        {['DÍAS', 'HORAS', 'MIN', 'SEG'].map((label) => (
          <div
            key={label}
            className="flex h-20 w-16 flex-col items-center justify-center rounded-xl border border-orange-500/20 bg-zinc-950/80 p-2 sm:h-24 sm:w-20"
          >
            <span className="font-display text-2xl text-orange-500 sm:text-3xl">--</span>
            <span className="text-[10px] font-semibold tracking-widest text-zinc-400">{label}</span>
          </div>
        ))}
      </div>
    )
  }

  const units = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEG', value: timeLeft.seconds },
  ]

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2 w-2 animate-ping rounded-full bg-orange-500" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
          Halloween Drop Countdown
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="group relative flex h-20 w-16 flex-col items-center justify-center overflow-hidden rounded-xl border border-orange-500/30 bg-zinc-950/90 p-2 shadow-[0_0_15px_rgba(255,107,0,0.15)] transition duration-300 hover:border-orange-500/80 hover:shadow-[0_0_25px_rgba(255,107,0,0.35)] sm:h-24 sm:w-20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 font-display text-2xl font-bold tabular-nums tracking-wider text-orange-400 drop-shadow-[0_0_8px_rgba(255,107,0,0.6)] sm:text-3xl">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="relative z-10 mt-1 text-[10px] font-semibold tracking-widest text-zinc-400">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
