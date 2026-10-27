import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { HalloweenPromoSection } from '@/components/halloween-promo-section'
import { EditorialReveal } from '@/components/editorial-reveal'
import { Categories } from '@/components/categories'
import { DreamBanner } from '@/components/dream-banner'
import { SiteFooter } from '@/components/site-footer'
import { ParallaxBackground } from '@/components/parallax-background'

export default function Page() {
  return (
    <main className="min-h-dvh bg-transparent">
      {/* Top Halloween Announcement Banner */}
      <div className="relative z-30 border-b border-orange-500/30 bg-black px-4 py-2 text-center text-xs font-bold text-orange-400 shadow-[0_4px_20px_rgba(255,107,0,0.15)]">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 sm:gap-4">
          <span className="text-sm animate-pulse">🎃</span>
          <span className="tracking-wider uppercase">DROP DE HALLOWEEN · TRÁILER OFICIAL DISPONIBLE</span>
          <span className="hidden text-zinc-400 sm:inline">|</span>
          <span className="hidden text-zinc-300 sm:inline">Edición Especial 31 de Octubre</span>
        </div>
      </div>

      <ParallaxBackground />
      <SiteHeader />
      
      {/* Primary Video Showcase right at the top */}
      <HalloweenPromoSection />
      
      <Hero />
      <EditorialReveal />
      <Categories />
      <DreamBanner />
      <SiteFooter />
    </main>
  )
}

