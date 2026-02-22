import type { Metadata } from "next"
import PageShell from "@/components/page-shell"
import { ProjectsSection } from "@/components/projects-section"

export const metadata: Metadata = {
  title: "Projects | Jagriti Yadav",
  description: "Featured AI/ML projects by Jagriti Yadav — RAG systems, computer vision, and applied machine learning.",
}

export default function ProjectsPage() {
  return (
    <PageShell>
      <ProjectsSection />
    </PageShell>
  )
}
