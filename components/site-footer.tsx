import { Logo, Sparkle } from '@/components/graphics'

const SOCIALS = ['Instagram', 'TikTok', 'Pinterest']

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 w-full max-w-6xl px-5 pb-10 sm:px-8">
      <div className="flex flex-col items-center gap-6 border-t border-dfw-blue/15 pt-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3 text-2xl text-dfw-blue">
          <Logo />
          <Sparkle className="h-4 w-4 text-dfw-blue/50" />
        </div>

        <p className="order-3 text-center text-xs text-muted-foreground sm:order-2">
          © {new Date().getFullYear()} DFWearing · Dream · Find · Wear
        </p>

        <nav className="order-2 flex items-center gap-5 sm:order-3" aria-label="Social media">
          {SOCIALS.map((name) => (
            <a
              key={name}
              href="#"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-dfw-blue transition hover:text-deep-blue"
            >
              {name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
