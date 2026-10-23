import type { Metadata } from 'next'
import { HalloweenParticles } from '@/components/halloween/halloween-particles'
import { HalloweenHeader } from '@/components/halloween/halloween-header'
import { HalloweenHero } from '@/components/halloween/halloween-hero'
import { HalloweenCategories } from '@/components/halloween/halloween-categories'
import { TrickOrTreat } from '@/components/halloween/trick-or-treat'
import { HalloweenEditorial } from '@/components/halloween/halloween-editorial'
import { HalloweenFooter } from '@/components/halloween/halloween-footer'

export const metadata: Metadata = {
  title: 'DFWearing — Halloween Midnight Drop | Edición Especial 31 Octubre',
  description:
    'Descubre el drop exclusivo de Halloween de DFWearing. Ropa streetwear gótica, hoodies oversized y sneakers en una cápsula limitada nocturna.',
  openGraph: {
    title: 'DFWearing Halloween Edition — Nightmare · Find · Wear',
    description: 'Drop exclusivo de medianoche. Ropa urbana y streetwear para los amantes de la noche.',
    images: ['/halloween-hero.jpg'],
  },
}

export default function HalloweenPage() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#0a080f] text-zinc-100 selection:bg-orange-500 selection:text-black">
      {/* Ambient background particles & mist */}
      <HalloweenParticles />

      {/* Floating subtle radial lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,200,0.18),rgba(255,255,255,0))]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_60%,rgba(255,107,0,0.08),transparent_50%)]" />

      {/* Content wrapper */}
      <div className="relative z-10">
        <HalloweenHeader />
        <HalloweenHero />
        <HalloweenCategories />
        <TrickOrTreat />
        <HalloweenEditorial />
        <HalloweenFooter />
      </div>
    </main>
  )
}
