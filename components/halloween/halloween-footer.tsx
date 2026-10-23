import Link from 'next/link'

export function HalloweenFooter() {
  return (
    <footer className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-5 pb-12 sm:px-8">
      <div className="flex flex-col items-center gap-6 border-t border-orange-500/20 pt-10 sm:flex-row sm:justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-orange-500 drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]">
            DF<span className="italic text-purple-400">Wearing</span>
          </span>
          <span className="text-xl">🎃</span>
          <span className="rounded-full border border-orange-500/30 bg-orange-950/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange-400">
            Halloween Edition
          </span>
        </div>

        {/* Center note */}
        <p className="text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} DFWearing · Dream · Find · Wear · Nocturnal Capsule
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wider text-orange-400 transition hover:text-orange-300 hover:underline"
          >
            ← Volver al Sitio Principal
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-orange-400"
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-orange-400"
          >
            TikTok
          </a>
        </div>
      </div>
    </footer>
  )
}
