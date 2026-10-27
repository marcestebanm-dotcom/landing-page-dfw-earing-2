import Link from 'next/link'
import { Logo } from '@/components/graphics'

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
      <a href="#top" className="text-2xl text-dfw-blue sm:text-3xl">
        <Logo />
      </a>
      <div className="flex items-center gap-3">
        <a
          href="#halloween-trailer"
          className="hidden items-center gap-1 rounded-full border border-orange-500/30 bg-soft-cream/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-800 transition hover:border-orange-500 hover:text-orange-600 sm:inline-flex sm:text-xs"
        >
          <span className="text-orange-500">▶</span>
          <span>Ver Tráiler</span>
        </a>
        <Link
          href="/halloween"
          className="group inline-flex items-center gap-1.5 rounded-full border border-orange-500/50 bg-black/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-400 shadow-[0_0_15px_rgba(255,107,0,0.3)] transition hover:bg-orange-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,107,0,0.7)] sm:text-xs"
        >
          <span className="text-sm transition-transform group-hover:scale-125">🎃</span>
          <span>Edición Halloween</span>
        </Link>
        <span className="hidden rounded-full border border-dfw-blue/40 bg-soft-cream px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-dfw-blue md:inline-block md:text-xs">
          Coming soon
        </span>
      </div>
    </header>
  )
}
