'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkle } from '@/components/graphics'

const WORDS = [
  { text: 'Dream', className: 'text-dfw-blue' },
  { text: 'Find', className: 'text-dfw-blue' },
  { text: 'Wear', className: 'text-deep-blue' },
] as const

function RevealWord({
  text,
  className,
  index,
}: {
  text: string
  className: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(entry.isIntersecting)
        }
      },
      { threshold: 0.55 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${index * 140}ms` : '0ms',
      }}
      className={`will-change-[opacity,transform] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <span
        className={`block font-display leading-[0.85] tracking-tight text-[clamp(4rem,20vw,16rem)] ${className}`}
      >
        {text}
      </span>
    </div>
  )
}

export function EditorialReveal() {
  return (
    <section
      aria-label="Dream, Find, Wear"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <Sparkle className="pointer-events-none absolute left-8 top-16 hidden h-8 w-8 text-dfw-blue/30 lg:block" />
      <Sparkle className="pointer-events-none absolute right-10 bottom-24 hidden h-10 w-10 text-deep-blue/25 lg:block" />

      <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center gap-10 px-5 text-center sm:gap-16 sm:px-8">
        {WORDS.map((word, i) => (
          <RevealWord
            key={word.text}
            text={word.text}
            className={word.className}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
