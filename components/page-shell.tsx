import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <ParticleBackground />
      <Navigation />

      <main className="relative z-10 pt-24 pb-16">
        {children}
      </main>

      <Footer />
    </div>
  )
}
