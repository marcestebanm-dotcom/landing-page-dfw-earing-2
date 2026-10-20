import { Sparkle } from '@/components/graphics'

export function DreamBanner() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="paper-grain relative overflow-hidden rounded-[2rem] bg-dfw-blue px-6 py-14 text-cream sm:px-14 sm:py-20">
        <Sparkle className="absolute right-8 top-8 h-14 w-14 text-cream/25" />
        <Sparkle className="absolute bottom-8 left-10 h-8 w-8 text-cream/20" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-display text-5xl leading-[0.9] sm:text-7xl">Dream bigger.</h2>
          <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-cream/85 sm:text-lg">
            Fashion isn&apos;t just what you wear. It&apos;s how you imagine yourself.
            On October 15 we open the doors to a world of the brands you love.
          </p>
          <p className="mt-6 font-display text-2xl tracking-wide text-cream/90 sm:text-3xl">
            Real fashion. Dream-like world.
          </p>
        </div>
      </div>
    </section>
  )
}
