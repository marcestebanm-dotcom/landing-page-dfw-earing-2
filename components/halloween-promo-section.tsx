'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowRight,
  Flame,
  Film,
  RotateCcw,
  Bell,
  Check,
  Moon,
  Skull,
} from 'lucide-react'

interface VideoTeaser {
  id: string
  title: string
  tag: string
  src: string
  description: string
}

const TEASERS: VideoTeaser[] = [
  {
    id: 'streetwear',
    title: 'Streetwear & Calabazas',
    tag: 'Tráiler Oficial',
    src: '/halloween-promo.mp4',
    description: 'La medianoche se acerca. Streetwear gótico, niebla urbana y calabazas malditas en la cápsula de Halloween de DFWearing.',
  },
  {
    id: 'pumpkin',
    title: 'Bosque de Calabazas',
    tag: 'Teaser Alternativo',
    src: '/halloween-promo-alt.mp4',
    description: 'Fuego interior y estética gótica. Un vistazo a las siluetas que dominarán la noche.',
  },
]

const HIGHLIGHTS = [
  {
    title: 'Oversized Hoodies',
    subtitle: '480 GSM · Reflective Print',
    image: '/halloween-hoodie.jpg',
    tag: 'Limitado a 100 uds',
  },
  {
    title: 'Midnight Sneakers',
    subtitle: 'Suela translúcida & Night Glow',
    image: '/halloween-sneakers.jpg',
    tag: 'Edición Especial',
  },
  {
    title: 'Amuletos de Plata',
    subtitle: 'Plata envejecida 925 gótica',
    image: '/halloween-accessories.jpg',
    tag: 'Piezas numeradas',
  },
]

export function HalloweenPromoSection() {
  const [activeTeaser, setActiveTeaser] = useState<VideoTeaser>(TEASERS[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('00:00')
  const [durationTime, setDurationTime] = useState('00:00')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [theaterMode, setTheaterMode] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize and sync background ambient audio
  useEffect(() => {
    const audio = new Audio('/halloween-ambient.mp3')
    audio.loop = true
    audio.volume = isMuted ? 0 : volume
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Sync volume & mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = volume
    }
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume * 0.8
      if (!isMuted && isPlaying) {
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    }
  }, [isMuted, volume, isPlaying])

  // Countdown timer to October 31 Midnight
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date()
      const year = now.getFullYear()
      let target = new Date(year, 9, 31, 23, 59, 59).getTime()
      if (now.getTime() > target) {
        target = new Date(year + 1, 9, 31, 23, 59, 59).getTime()
      }
      const diff = target - now.getTime()
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }
    calculateCountdown()
    const timer = setInterval(calculateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Handle video progress update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const current = videoRef.current.currentTime
    const duration = videoRef.current.duration || 1
    setProgress((current / duration) * 100)
    setCurrentTime(formatTime(current))
    setDurationTime(formatTime(duration))
  }

  // Handle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
      audioRef.current?.pause()
    } else {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
      if (!isMuted) {
        audioRef.current?.play().catch(() => {})
      }
    }
  }

  // Handle Mute toggle
  const toggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (!nextMuted && isPlaying) {
      audioRef.current?.play().catch(() => {})
    }
  }

  // Handle seek on click progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = clickPosition * videoRef.current.duration
    setProgress(clickPosition * 100)
  }

  // Handle Fullscreen
  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Switch Teaser
  const switchTeaser = (teaser: VideoTeaser) => {
    setActiveTeaser(teaser)
    if (videoRef.current) {
      videoRef.current.src = teaser.src
      videoRef.current.currentTime = 0
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput) return
    setEmailSubmitted(true)
  }

  return (
    <section
      id="halloween-trailer"
      className="relative mx-auto mb-16 mt-2 w-full max-w-6xl scroll-mt-10 px-4 sm:px-8 lg:mb-24 lg:mt-4"
      aria-label="Halloween Event Video Preview"
    >
      {/* Outer ambient glow */}
      <div className="pointer-events-none absolute -inset-4 z-0 rounded-[3rem] bg-gradient-to-r from-orange-600/20 via-purple-900/15 to-orange-500/20 blur-3xl" />

      {/* Main card */}
      <div className="relative z-10 overflow-hidden rounded-[2.5rem] border-2 border-orange-500/35 bg-[#0a0712] p-6 shadow-[0_20px_70px_rgba(255,107,0,0.18)] sm:p-10 lg:p-12">
        {/* Subtle decorative spider webs & gradient mesh */}
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,0,0.15),transparent_70%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 bg-[radial-gradient(ellipse_at_bottom_left,rgba(147,51,234,0.18),transparent_70%)]" />

        {/* Section Header */}
        <div className="relative z-10 mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-950/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-orange-400 shadow-[0_0_20px_rgba(255,107,0,0.25)]">
              <span className="animate-pulse text-sm">🎃</span>
              <span>Evento Especial · Tráiler Exclusivo</span>
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-orange-400" />
            </div>

            <h2 className="mt-4 font-display text-4xl leading-[0.9] text-zinc-100 sm:text-6xl lg:text-7xl">
              HALLOWEEN{' '}
              <span className="text-orange-500 drop-shadow-[0_0_35px_rgba(255,107,0,0.6)]">
                MIDNIGHT DROP
              </span>
            </h2>

            <p className="mt-3 max-w-2xl text-pretty text-sm text-zinc-300 sm:text-base">
              La cara más oscura de <span className="font-semibold text-orange-400">DFWearing</span> debuta el 31 de octubre a medianoche. 
              Reproduce el tráiler oficial y descubre la cápsula gótica de streetwear antes del lanzamiento.
            </p>
          </div>

          {/* Quick countdown badge */}
          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-orange-500/30 bg-zinc-950/80 p-3 backdrop-blur-md">
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                Apertura Drop
              </div>
              <div className="font-display text-2xl tabular-nums text-zinc-100">
                {String(countdown.days).padStart(2, '0')}d :{' '}
                {String(countdown.hours).padStart(2, '0')}h :{' '}
                {String(countdown.minutes).padStart(2, '0')}m :{' '}
                <span className="text-orange-400">{String(countdown.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
            <Flame className="h-7 w-7 text-orange-500 animate-pulse" />
          </div>
        </div>

        {/* Video Player Wrapper */}
        <div
          ref={containerRef}
          className="group relative overflow-hidden rounded-[2rem] border border-orange-500/40 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Main Video */}
          <video
            ref={videoRef}
            src={activeTeaser.src}
            poster="/halloween-hero.jpg"
            loop
            playsInline
            autoPlay
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="aspect-[16/9] w-full cursor-pointer object-cover transition-transform duration-700 sm:aspect-[21/9]"
          />

          {/* Vignette overlays for readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />

          {/* Top Bar inside Video */}
          <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
            <div className="flex items-center gap-2 rounded-full border border-orange-500/50 bg-black/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-300 backdrop-blur-md">
              <Film className="h-3.5 w-3.5 text-orange-400" />
              <span>{activeTeaser.tag}: {activeTeaser.title}</span>
            </div>

            {/* Teaser selector pills */}
            <div className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-black/80 p-1 backdrop-blur-md">
              {TEASERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => switchTeaser(t)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                    activeTeaser.id === t.id
                      ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(255,107,0,0.5)]'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                  }`}
                >
                  {t.id === 'streetwear' ? <Flame className="h-3 w-3" /> : <Skull className="h-3 w-3" />}
                  <span className="hidden sm:inline">{t.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Big Center Play / Pause Indicator */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            className={`absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-500/80 bg-black/60 p-5 text-orange-400 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_40px_rgba(255,107,0,0.8)] ${
              isPlaying ? 'opacity-0 hover:opacity-100 group-hover:opacity-80' : 'opacity-100 scale-105 shadow-[0_0_35px_rgba(255,107,0,0.6)]'
            }`}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 fill-current" />
            ) : (
              <Play className="h-8 w-8 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Bottom Custom Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 transition-opacity duration-300 sm:p-6">
            {/* Scrubber / Progress Bar */}
            <div
              onClick={handleSeek}
              className="group/seek relative mb-3.5 h-2 w-full cursor-pointer rounded-full bg-zinc-800/80 backdrop-blur-sm"
            >
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 shadow-[0_0_12px_rgba(255,107,0,0.7)]"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute -right-1.5 -top-1 h-4 w-4 rounded-full border-2 border-white bg-orange-500 opacity-0 transition-opacity group-hover/seek:opacity-100 shadow-[0_0_10px_rgba(255,107,0,1)]" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Left: Play/Pause & Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="rounded-lg border border-orange-500/40 bg-zinc-900/80 p-2 text-zinc-100 transition hover:bg-orange-500 hover:text-black"
                  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                </button>

                {/* Sound Button */}
                <button
                  onClick={toggleMute}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-bold transition ${
                    isMuted
                      ? 'border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:border-orange-500 hover:text-orange-400'
                      : 'border-orange-500 bg-orange-500/20 text-orange-300 shadow-[0_0_15px_rgba(255,107,0,0.3)]'
                  }`}
                  aria-label={isMuted ? 'Activar sonido tenebroso' : 'Silenciar sonido'}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-orange-400 animate-pulse" />}
                  <span>{isMuted ? 'Activar Sonido Spooky' : 'Sonido Activo'}</span>
                </button>

                {/* Time Display */}
                <span className="font-mono text-zinc-400">
                  <span className="text-zinc-100">{currentTime}</span> / {durationTime}
                </span>
              </div>

              {/* Right: Fullscreen & Quick Event CTA */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="rounded-lg border border-zinc-700 bg-zinc-900/80 p-2 text-zinc-300 transition hover:border-orange-500 hover:text-orange-400"
                  aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>

                <Link
                  href="/halloween"
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(255,107,0,0.5)] transition hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(255,107,0,0.8)]"
                >
                  <span>Ver Colección Completa</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sneak Peek Product Highlights Carousel / Grid */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl text-zinc-100 sm:text-3xl">
                Piezas Destacadas del Tráiler
              </h3>
              <p className="text-xs text-zinc-400 sm:text-sm">
                Edición estrictamente limitada a 100 unidades por diseño. Disponibles únicamente durante el evento.
              </p>
            </div>
            <Link
              href="/halloween"
              className="hidden items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 hover:underline sm:inline-flex"
            >
              <span>Explorar Todo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <Link
                key={item.title}
                href="/halloween"
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3 transition duration-300 hover:border-orange-500/70 hover:shadow-[0_0_25px_rgba(255,107,0,0.2)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 rounded-full border border-orange-500/40 bg-black/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    {item.tag}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between px-1">
                  <div>
                    <h4 className="font-display text-lg text-zinc-100 transition group-hover:text-orange-400">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400">{item.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-zinc-800 p-1.5 text-zinc-300 transition group-hover:bg-orange-500 group-hover:text-black">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick VIP Notification Form Bar */}
        <div className="mt-8 rounded-2xl border border-orange-500/30 bg-orange-950/30 p-5 sm:p-6 backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-500/40 bg-orange-500/20 text-2xl text-orange-400 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                🦇
              </div>
              <div>
                <h4 className="font-display text-xl text-zinc-100">
                  ¿Quieres Acceso Prioritario de Medianoche?
                </h4>
                <p className="text-xs text-zinc-300 sm:text-sm">
                  Déjanos tu email y te enviaremos el enlace privado 15 minutos antes que a nadie.
                </p>
              </div>
            </div>

            {emailSubmitted ? (
              <div className="flex items-center gap-2 rounded-full border border-orange-500/60 bg-orange-950/80 px-5 py-2.5 text-xs font-bold text-orange-300 shadow-[0_0_15px_rgba(255,107,0,0.3)]">
                <Check className="h-4 w-4 text-orange-400" />
                <span>¡Apuntado a la lista negra! Te avisaremos el 31 a las 23:45.</span>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="Introduce tu correo..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 sm:w-64"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(255,107,0,0.4)] transition hover:bg-orange-400 hover:shadow-[0_0_25px_rgba(255,107,0,0.7)]"
                >
                  <Bell className="h-3.5 w-3.5" />
                  <span>Avisarme</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
