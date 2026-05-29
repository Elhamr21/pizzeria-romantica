import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { MenuSection } from '@/components/menu-section'
import { AboutSection } from '@/components/about-section'
import { ReviewsSection } from '@/components/reviews-section'
import { GallerySection } from '@/components/gallery-section'
import { CTASection } from '@/components/cta-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { MobileNav } from '@/components/mobile-nav'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <ReviewsSection />
      <GallerySection />
      <CTASection />
      <ContactSection />
      <Footer />
      <MobileNav />
    </main>
  )
}
