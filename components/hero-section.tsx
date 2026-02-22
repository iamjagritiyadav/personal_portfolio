"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, FileText, Mail, Layers } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-6"
    >
      {/* Subtle radial glow behind hero */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.2 250 / 0.3) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Spline 3D Robot */}
        <div
          className={`hidden flex-1 items-center justify-center lg:flex transition-all duration-1000 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative h-[500px] w-full max-w-[500px] xl:h-[600px] xl:max-w-[600px]">
            <iframe
              src="https://my.spline.design/genkubgreetingrobot-vO1gOGb33L2ka0yI7vQoRn1H/"
              frameBorder="0"
              width="100%"
              height="100%"
              title="3D Greeting Robot"
              className="rounded-lg"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: Text content */}
        <div
          className={`flex-1 text-center transition-all duration-1000 delay-300 lg:text-left ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-gradient">Jagriti Yadav</span>
          </h1>

          <p className="mt-6 text-lg font-medium text-muted-foreground sm:text-xl">
            Aspiring AI Engineer & Data Scientist
          </p>

          <p className="mt-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground lg:mx-0">
            AI/ML undergraduate with hands-on experience building and evaluating
            end-to-end machine learning and LLM-based systems. Strong exposure to
            Retrieval-Augmented Generation (RAG), Computer Vision, and applied ML
            pipelines. Passionate about building reliable AI systems for healthcare
            and real-world problem solving.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80">
              <a href="/projects">
                <Layers className="size-4" />
                View Projects
              </a>
            </Button>
            <Button asChild variant="outline" className="border-border/50 bg-secondary/30 text-foreground hover:bg-secondary/60">
              <a href="/blog">
                <Layers className="size-4" />
                Explore Blog
              </a>
            </Button>
            <Button asChild variant="outline" className="border-border/50 bg-secondary/30 text-foreground hover:bg-secondary/60">
              <a href="https://drive.google.com/file/d/1k4Jmu3JfWkdX8SOi3eWcLRLjF114GOTF/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <FileText className="size-4" />
                Resume
              </a>
            </Button>
            <Button asChild variant="outline" className="border-border/50 bg-secondary/30 text-foreground hover:bg-secondary/60">
              <a href="/contact">
                <Mail className="size-4" />
                Contact
              </a>
            </Button>
          </div>

          <a
            href="/about"
            className="mt-16 inline-flex animate-bounce text-muted-foreground transition-colors hover:text-primary"
            aria-label="Scroll to About section"
          >
            <ArrowDown className="size-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
