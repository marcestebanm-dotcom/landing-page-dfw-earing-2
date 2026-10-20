import { Logo } from '@/components/graphics'

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
      <a href="#top" className="text-2xl text-dfw-blue sm:text-3xl">
        <Logo />
      </a>
      <span className="rounded-full border border-dfw-blue/40 bg-soft-cream px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-dfw-blue sm:text-xs">
        Coming soon
      </span>
    </header>
  )
}
