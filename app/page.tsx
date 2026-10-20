import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { EditorialReveal } from '@/components/editorial-reveal'
import { Categories } from '@/components/categories'
import { DreamBanner } from '@/components/dream-banner'
import { SiteFooter } from '@/components/site-footer'
import { ParallaxBackground } from '@/components/parallax-background'

export default function Page() {
  return (
    <main className="min-h-dvh bg-transparent">
      <ParallaxBackground />
      <SiteHeader />
      <Hero />
      <EditorialReveal />
      <Categories />
      <DreamBanner />
      <SiteFooter />
    </main>
  )
}
