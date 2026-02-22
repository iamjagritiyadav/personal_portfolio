"use client"

import {
  Brain,
  Eye,
  HeartPulse,
  ShieldCheck,
  Cpu,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const interests = [
  { icon: Brain, label: "Generative AI" },
  { icon: Search, label: "Retrieval-Augmented Generation (RAG)" },
  { icon: Eye, label: "Computer Vision" },
  { icon: Cpu, label: "Face & Emotion Detection" },
  { icon: HeartPulse, label: "Healthcare AI" },
  { icon: ShieldCheck, label: "Responsible AI" },
]

const skillCategories = [
  {
    title: "Programming",
    skills: ["Python", "SQL"],
  },
  {
    title: "Machine Learning",
    skills: [
      "Feature Engineering",
      "Supervised Learning",
      "Model Training",
      "Model Evaluation",
    ],
  },
  {
    title: "Deep Learning & GenAI",
    skills: ["CNNs", "Transformers", "RAG", "Prompt Engineering"],
  },
  {
    title: "Tools",
    skills: [
      "TensorFlow",
      "Scikit-learn",
      "LangChain",
      "FAISS",
      "Git",
      "GitHub",
      "Google Cloud Platform",
    ],
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Building scalable AI systems, evaluation pipelines, and intelligent
            assistants.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Education */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Education
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground">
                  B.Tech CSE (Artificial Intelligence)
                </p>
                <p className="text-sm text-muted-foreground">
                  University of Lucknow (2023 - 2027)
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">
                  BS in Programming & Data Science
                </p>
                <p className="text-sm text-muted-foreground">IIT Madras</p>
              </div>
            </div>
          </div>

          {/* Core Interests */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Core Interests
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {interests.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3 transition-colors hover:bg-secondary/60"
                >
                  <Icon className="size-4 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
            Technical Skills
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="glass-card rounded-xl p-5 transition-all hover:glow-blue"
              >
                <h4 className="mb-3 text-sm font-semibold text-primary">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-secondary/60 text-secondary-foreground text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
