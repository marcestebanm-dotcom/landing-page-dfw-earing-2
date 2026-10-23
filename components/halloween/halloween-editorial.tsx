export function HalloweenEditorial() {
  const points = [
    {
      num: '01',
      title: 'Gramaje Pesado (450 GSM)',
      desc: 'Tejido french terry de máxima densidad. Caída estructurada diseñada para durar más allá de la noche de brujas.',
      icon: '🛡️',
    },
    {
      num: '02',
      title: 'Detalles Reactivos UV',
      desc: 'Tintas fotoluminiscentes que cobran vida en discotecas, clubs y en plena penumbra nocturna.',
      icon: '✨',
    },
    {
      num: '03',
      title: 'Numeración de Coleccionista',
      desc: 'Cada prenda incluye placa metálica y chip NFC numerado del 001 al 100.',
      icon: '🏷️',
    },
  ]

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-purple-500/30 bg-gradient-to-r from-zinc-950 via-purple-950/20 to-zinc-950 p-8 sm:p-14">
        <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              ⚡ The Dark Philosophy
            </span>
            <h2 className="mt-3 font-display text-4xl text-zinc-100 sm:text-6xl">
              Couture of the <br />
              <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(255,107,0,0.5)]">
                Shadows
              </span>
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400">
              No es un disfraz; es una declaración estética. En Halloween 2026 presentamos
              nuestra visión más transgresora del streetwear contemporáneo. Piezas concebidas
              con la precisión del lujo y el espíritu rebelde de la cultura underground.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="font-display text-3xl text-orange-400 sm:text-4xl">100</span>
              <span className="text-xs uppercase tracking-widest text-zinc-400">
                Piezas exclusivas por diseño en todo el mundo
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            {points.map((pt) => (
              <div
                key={pt.num}
                className="group relative flex items-start gap-4 rounded-2xl border border-zinc-800 bg-black/60 p-5 transition duration-300 hover:border-orange-500/50 hover:bg-zinc-900/60 hover:shadow-[0_0_20px_rgba(255,107,0,0.2)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-950/40 text-xl">
                  {pt.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-orange-500">{pt.num}</span>
                    <h3 className="font-display text-xl text-zinc-200 group-hover:text-orange-400">
                      {pt.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
