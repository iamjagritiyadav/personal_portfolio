import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <ParticleBackground />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
      </main>

      <Footer />
    </div>
  )
}
