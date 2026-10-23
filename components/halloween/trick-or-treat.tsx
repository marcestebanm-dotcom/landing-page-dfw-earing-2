'use client'

import { useState } from 'react'

const REWARDS = [
  {
    title: '🎃 Jack O’ Lantern Treat',
    code: 'SPOOKY20',
    discount: '20% OFF',
    desc: 'Válido para todo el Drop de Halloween',
  },
  {
    title: '🦇 Midnight Bat Blessing',
    code: 'NIGHTMARE25',
    discount: '25% OFF',
    desc: 'Acceso VIP prioritario a las 00:00h',
  },
  {
    title: '👻 Phantom Special Drop',
    code: 'GHOSTSHIP',
    discount: 'ENVÍO GRATIS + 15% OFF',
    desc: 'Para pedidos del 31 de Octubre',
  },
]

export function TrickOrTreat() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSelect = (index: number) => {
    setSelectedBox(index)
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-orange-500/30 bg-gradient-to-b from-purple-950/40 via-zinc-950/90 to-black p-8 text-center shadow-[0_0_50px_rgba(255,107,0,0.15)] sm:p-14">
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            <span>🍬</span> Minijuego Exclusivo
          </span>

          <h2 className="mt-4 font-display text-4xl text-orange-400 drop-shadow-[0_0_15px_rgba(255,107,0,0.4)] sm:text-6xl">
            Trick or Treat?
          </h2>

          <p className="mt-3 text-pretty text-base text-zinc-300 sm:text-lg">
            Elige una de las tres calabazas embrujadas y desbloquea tu código de descuento secreto para la noche del drop.
          </p>

          {/* 3 Mystery Pumpkins */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((idx) => {
              const isSelected = selectedBox === idx
              const reward = REWARDS[idx]

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border p-6 transition-all duration-300 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-950/40 shadow-[0_0_30px_rgba(255,107,0,0.35)] scale-[1.03]'
                      : 'border-zinc-800 bg-zinc-900/60 hover:border-orange-500/50 hover:bg-zinc-900 hover:shadow-[0_0_20px_rgba(255,107,0,0.2)]'
                  }`}
                >
                  <span className="text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:text-6xl">
                    {isSelected ? '🧙‍♂️' : idx === 0 ? '🎃' : idx === 1 ? '🦇' : '👻'}
                  </span>

                  <span className="mt-4 font-display text-xl tracking-wide text-zinc-200 group-hover:text-orange-400">
                    {isSelected ? reward.title : `Misterio #${idx + 1}`}
                  </span>

                  <span className="mt-1 text-xs text-zinc-400">
                    {isSelected ? '¡Desbloqueado!' : 'Toca para abrir'}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Reveal details */}
          {selectedBox !== null && (
            <div className="mt-8 animate-fadeIn rounded-2xl border border-orange-500/40 bg-zinc-900/90 p-6 shadow-[0_0_25px_rgba(255,107,0,0.25)]">
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                Tu recompensa embrujada
              </span>
              <div className="mt-2 font-display text-3xl text-orange-400 sm:text-4xl">
                {REWARDS[selectedBox].discount}
              </div>
              <p className="mt-1 text-sm text-zinc-300">{REWARDS[selectedBox].desc}</p>

              {/* Promo code copy box */}
              <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-orange-500/60 bg-black/80 px-5 py-2.5">
                <span className="font-mono text-base font-bold tracking-widest text-orange-400">
                  {REWARDS[selectedBox].code}
                </span>
                <button
                  onClick={() => handleCopy(REWARDS[selectedBox].code)}
                  className="rounded-full bg-orange-500 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-orange-400 hover:shadow-[0_0_12px_rgba(255,107,0,0.6)]"
                >
                  {copied ? '¡Copiado! ✓' : 'Copiar'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
