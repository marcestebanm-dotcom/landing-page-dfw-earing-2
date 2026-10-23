import Image from 'next/image'

const HALLOWEEN_CATEGORIES = [
  {
    label: 'Haunted Hoodies',
    tag: 'Drop #01',
    desc: 'Oversized dark fleece con bordados góticos reactivos a la luz',
    img: '/halloween-hoodie.jpg',
  },
  {
    label: 'Shadow Sneakers',
    tag: 'Drop #02',
    desc: 'Siluetas chunky negras con detalles en naranja fuego',
    img: '/halloween-sneakers.jpg',
  },
  {
    label: 'Occult Jewelry',
    tag: 'Drop #03',
    desc: 'Anillos de plata envejecida, calaveras y cadenas de culto',
    img: '/halloween-accessories.jpg',
  },
  {
    label: 'Nocturnal Fits',
    tag: 'Drop #04',
    desc: 'Gabardinas desgastadas y estética midnight couture',
    img: '/halloween-fits.jpg',
  },
]

export function HalloweenCategories() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      {/* Title */}
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            🎃 Limited Halloween Capsule
          </span>
          <h2 className="mt-2 font-display text-4xl text-zinc-100 sm:text-6xl">
            Cápsula <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(255,107,0,0.4)]">Nocturna</span>
          </h2>
          <p className="mt-2 max-w-lg text-sm text-zinc-400 sm:text-base">
            Solo 100 unidades por pieza. Estilo streetwear confeccionado para adueñarse de la oscuridad.
          </p>
        </div>

        <div className="rounded-full border border-orange-500/30 bg-orange-950/30 px-4 py-1.5 text-xs font-semibold text-orange-400">
          Lanzamiento Exclusivo · 31 Octubre
        </div>
      </div>

      {/* Grid of category cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HALLOWEEN_CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-500/60 hover:shadow-[0_10px_35px_rgba(255,107,0,0.25)]"
          >
            {/* Image box */}
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
              <Image
                src={cat.img}
                alt={cat.label}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />

              {/* Tag pill */}
              <span className="absolute left-3 top-3 rounded-full border border-orange-500/40 bg-black/75 px-3 py-1 text-[11px] font-bold tracking-wider text-orange-400 backdrop-blur-md">
                {cat.tag}
              </span>
            </div>

            {/* Description */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className="font-display text-2xl tracking-wide text-zinc-100 group-hover:text-orange-400">
                  {cat.label}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-800/60 pt-3">
                <span className="text-[11px] uppercase tracking-widest text-zinc-500">Unidades Limitadas</span>
                <span className="text-xs font-semibold text-orange-400 transition group-hover:translate-x-1">
                  Ver Drop →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
