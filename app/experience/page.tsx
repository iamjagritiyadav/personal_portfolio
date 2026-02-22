import type { Metadata } from "next"
import PageShell from "@/components/page-shell"
import { ExperienceSection } from "@/components/experience-section"

export const metadata: Metadata = {
  title: "Experience | Jagriti Yadav",
  description: "Professional experience and community contributions of Jagriti Yadav across AI, engineering, and leadership.",
}

export default function ExperiencePage() {
  return (
    <PageShell>
      <ExperienceSection />
    </PageShell>
  )
}
