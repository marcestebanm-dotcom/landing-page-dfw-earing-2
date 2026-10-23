'use client'

import { useState } from 'react'
import Image from 'next/image'
import { HalloweenCountdown } from './halloween-countdown'

export function HalloweenHero() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="relative overflow-hidden pt-6 lg:pt-12">
      {/* Background radial glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-orange-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full bg-purple-700/15 blur-[140px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-24">
        {/* Left Column: Copy */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
            <span>🕷️</span> Midnight Drop · 31 de Octubre
          </span>

          <h1 className="mt-6 font-display text-[clamp(3.8rem,11vw,7.5rem)] leading-[0.84] text-zinc-100">
            NIGHTMARE
            <br />
            FIND
            <br />
            <span className="text-orange-500 drop-shadow-[0_0_30px_rgba(255,107,0,0.55)]">
              WEAR
            </span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
            La faceta más oscura y exclusiva de <span className="font-bold text-orange-400">DFWearing</span>.
            Sudaderas oversized de culto, calzado nocturno y accesorios forjados en plata y sombras.{' '}
            <span className="font-semibold text-zinc-100">Solo para los que no temen destacar.</span>
          </p>

          {/* Countdown */}
          <div className="mt-8">
            <HalloweenCountdown />
          </div>

          {/* Notify Form */}
          <div className="mt-8 max-w-md">
            <p className="mb-3 text-sm font-medium text-zinc-300">
              🎃 Sé el primero en acceder al drop a medianoche:
            </p>

            {submitted ? (
              <div className="flex items-center gap-3 rounded-2xl border border-orange-500/60 bg-orange-950/40 p-4 text-sm text-orange-300 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                <span className="text-2xl">🦇</span>
                <div>
                  <div className="font-bold">¡Estás en la lista negra!</div>
                  <div className="text-xs text-orange-200/80">Te enviaremos el enlace privado 15 minutos antes de la medianoche.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Introduce tu correo electrónico..."
                  className="flex-1 rounded-full border border-zinc-700 bg-zinc-950/90 px-5 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(255,107,0,0.5)] transition hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(255,107,0,0.8)]"
                >
                  <span>Entrar</span>
                  <span>⚡</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Hero Artwork */}
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] border-2 border-orange-500/30 bg-zinc-950 shadow-[0_0_40px_rgba(255,107,0,0.25)]">
            <Image
              src="/halloween-hero.jpg"
              alt="Halloween Gothic Streetwear Illustration"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Dark vignette glow overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Glowing corner badge */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-orange-500/40 bg-zinc-950/80 p-3.5 backdrop-blur-md">
              <div>
                <div className="font-display text-lg text-orange-400">GOTHIC CAPSULE &apos;26</div>
                <div className="text-[11px] text-zinc-400">Streetwear &amp; Nocturnal Couture</div>
              </div>
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-black">
                LIMITADO
              </span>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="pointer-events-none absolute -bottom-4 -left-4 rounded-full border border-orange-500/40 bg-zinc-950/90 p-3 text-2xl shadow-[0_0_20px_rgba(255,107,0,0.4)]">
            🦇
          </div>
          <div className="pointer-events-none absolute -right-3 top-10 rounded-full border border-purple-500/40 bg-zinc-950/90 p-3 text-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            🔮
          </div>
        </div>
      </div>
    </section>
  )
}
