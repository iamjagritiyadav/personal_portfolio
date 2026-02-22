import type { Metadata } from "next"
import PageShell from "@/components/page-shell"
import { AboutSection } from "@/components/about-section"

export const metadata: Metadata = {
  title: "About | Jagriti Yadav",
  description: "Education, skills, and core interests of Jagriti Yadav — Aspiring AI Engineer & Data Scientist.",
}

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection />
    </PageShell>
  )
}
