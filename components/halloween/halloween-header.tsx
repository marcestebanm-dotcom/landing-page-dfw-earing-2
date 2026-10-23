'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export function HalloweenHeader() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const toggleSpookyAudio = () => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        audioCtxRef.current = ctx

        // Low frequency drone
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()
        gainNodeRef.current = gain

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(55, ctx.currentTime) // Low A

        osc2.type = 'triangle'
        osc2.frequency.setValueAtTime(58, ctx.currentTime) // Slight detune for eerie beat frequency

        gain.gain.setValueAtTime(0.01, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        setIsPlayingAudio(true)
      } catch {
        // AudioContext not allowed or failed
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5)
        setTimeout(() => {
          audioCtxRef.current?.close()
          audioCtxRef.current = null
          setIsPlayingAudio(false)
        }, 500)
      } else {
        setIsPlayingAudio(false)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return (
    <header className="relative z-30 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
      {/* Brand logo */}
      <Link href="/halloween" className="group flex items-center gap-3">
        <span className="font-display text-2xl tracking-tight text-orange-500 drop-shadow-[0_0_12px_rgba(255,107,0,0.5)] transition duration-300 group-hover:text-orange-400 sm:text-3xl">
          DF<span className="italic text-purple-400">Wearing</span>
        </span>
        <span className="inline-block animate-bounce text-xl">🎃</span>
      </Link>

      {/* Action badges & link */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sound FX Toggle */}
        <button
          onClick={toggleSpookyAudio}
          type="button"
          aria-label={isPlayingAudio ? 'Silenciar sonido' : 'Activar sonido espectral'}
          className={`hidden items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wider transition sm:inline-flex ${
            isPlayingAudio
              ? 'border-orange-500 bg-orange-500/20 text-orange-300 shadow-[0_0_15px_rgba(255,107,0,0.4)]'
              : 'border-purple-500/30 bg-purple-950/40 text-purple-300 hover:border-orange-500/50 hover:text-orange-300'
          }`}
        >
          <span>{isPlayingAudio ? '🔊' : '🔇'}</span>
          <span>{isPlayingAudio ? 'Ambiente ON' : 'Sonido'}</span>
        </button>

        {/* Back to main store */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-zinc-900/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-orange-400 backdrop-blur-md transition hover:border-orange-400 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,107,0,0.6)]"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          <span>Web Original</span>
        </Link>
      </div>
    </header>
  )
}
