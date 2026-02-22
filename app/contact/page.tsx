import type { Metadata } from "next"
import PageShell from "@/components/page-shell"
import { ContactSection } from "@/components/contact-section"

export const metadata: Metadata = {
  title: "Contact | Jagriti Yadav",
  description: "Get in touch with Jagriti Yadav — reach out for collaborations, opportunities, or just to connect.",
}

export default function ContactPage() {
  return (
    <PageShell>
      <ContactSection />
    </PageShell>
  )
}
