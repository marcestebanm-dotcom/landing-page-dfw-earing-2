import Image from 'next/image'
import { Sparkle } from '@/components/graphics'

const CATEGORIES = [
  { label: 'Women', img: '/category-women.png' },
  { label: 'Men', img: '/category-men.png' },
  { label: 'Accessories', img: '/category-accessories.png' },
  { label: 'Sneakers', img: '/category-sneakers.png' },
]

export function Categories() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl text-dfw-blue sm:text-5xl">Discover</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A sneak peek of what you&apos;ll be able to shop by category.
          </p>
        </div>
        <Sparkle className="hidden h-8 w-8 shrink-0 text-dfw-blue/40 sm:block" />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="paper-grain group relative aspect-square overflow-hidden rounded-2xl border border-dfw-blue/20 bg-soft-cream"
          >
            <Image
              src={cat.img}
              alt={`${cat.label} category illustration`}
              fill
              sizes="(max-width: 768px) 45vw, 22vw"
              className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-cream/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-deep-blue backdrop-blur-sm">
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
