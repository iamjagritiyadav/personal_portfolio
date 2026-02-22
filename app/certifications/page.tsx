import type { Metadata } from "next"
import PageShell from "@/components/page-shell"
import { CertificationsSection } from "@/components/certifications-section"

export const metadata: Metadata = {
  title: "Certifications | Jagriti Yadav",
  description: "Certifications and coding achievements of Jagriti Yadav — McKinsey, Google, SQL, Python, and more.",
}

export default function CertificationsPage() {
  return (
    <PageShell>
      <CertificationsSection />
    </PageShell>
  )
}
