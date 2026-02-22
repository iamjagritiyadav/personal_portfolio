"use client"

import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const SERVICE_ID = "service_gfk27fc"
const TEMPLATE_ID = "template_0tnf8gl"
const PUBLIC_KEY = "MUDkbPrBlDASGGUYK"

type Status = "idle" | "sending" | "success" | "error"

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setStatus("sending")

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      setStatus("success")
      setFormState({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            {"I'm always interested in connecting with fellow researchers, engineers, and anyone passionate about AI."}
          </p>
        </div>

        <div className="glass-card rounded-xl p-8">
          {/* Status banners */}
          {status === "success" && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              <CheckCircle className="size-5 shrink-0" />
              Message sent successfully! I will get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="size-5 shrink-0" />
              Something went wrong. Please try again or email me directly.
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className="bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground"
                  required
                  disabled={status === "sending"}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground"
                  required
                  disabled={status === "sending"}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                rows={5}
                placeholder="Your message..."
                className="w-full rounded-md border border-border/50 bg-secondary/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
                required
                disabled={status === "sending"}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {/* Social links */}
          <div className="mt-8 flex items-center justify-center gap-6 border-t border-border/30 pt-6">
            <a
              href="mailto:contact@jagritiyadav.com"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              aria-label="Email"
            >
              <Mail className="size-4" />
              Email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
