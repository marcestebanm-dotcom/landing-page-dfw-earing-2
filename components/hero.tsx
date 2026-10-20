import Image from 'next/image'
import { Countdown } from '@/components/countdown'
import { NotifyForm } from '@/components/notify-form'
import { Sparkle, OrbitLine } from '@/components/graphics'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <OrbitLine className="pointer-events-none absolute -right-24 top-10 hidden h-72 w-[36rem] text-dfw-blue/15 lg:block" />
      <Sparkle className="pointer-events-none absolute left-6 top-24 hidden h-10 w-10 text-dfw-blue/40 lg:block" />
      <Sparkle className="pointer-events-none absolute right-1/3 top-6 hidden h-6 w-6 text-dfw-blue/30 lg:block" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-24 lg:pt-10">
        {/* Left: copy */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-dfw-blue/30 bg-soft-cream px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-dfw-blue">
            <Sparkle className="h-3 w-3" />
            Opening · October 15
          </span>

          <h1 className="mt-6 font-display text-[clamp(3.5rem,11vw,7rem)] leading-[0.86] text-dfw-blue">
            Dream
            <br />
            Find
            <br />
            <span className="text-deep-blue">Wear</span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            The new home of the best clothing brands is about to open.
            Mujer, hombre, accesorios y sneakers en un solo lugar.{' '}
            <span className="font-semibold text-ink">Discover your style.</span>
          </p>

          <div className="mt-8">
            <Countdown />
          </div>

          <div className="mt-8 max-w-md">
            <p className="mb-3 text-sm font-medium text-ink">
              Be the first in. We&apos;ll notify you on launch day:
            </p>
            <NotifyForm />
          </div>
        </div>

        {/* Right: illustration */}
        <div className="relative">
          <div className="paper-grain relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-dfw-blue/20 bg-soft-cream">
            <Image
              src="/hero-figure.png"
              alt="Blue pencil sketch of a person in streetwear"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover mix-blend-multiply"
            />
          </div>
          <Sparkle className="absolute -left-3 top-8 h-9 w-9 text-dfw-blue" />
          <Sparkle className="absolute -bottom-2 right-10 h-6 w-6 text-deep-blue" />
        </div>
      </div>
    </section>
  )
}
