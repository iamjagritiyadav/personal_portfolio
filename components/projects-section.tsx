"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

const projects = [
  {
    title: "Healthcare Knowledge Assistant (RAG System)",
    description:
      "End-to-end Retrieval-Augmented Generation pipeline for healthcare decision support with grounding checks to reduce hallucinations.",
    details: [
      "End-to-end RAG pipeline architecture",
      "Semantic chunking + embedding retrieval for medical documents",
      "LangChain retriever-LLM workflow integration",
      "Grounding checks to reduce hallucinations",
      "Healthcare-focused decision support system",
    ],
    tags: ["LangChain", "FAISS", "Python", "RAG", "Healthcare AI"],
    github: "#",
  },
  {
    title: "Face & Emotion Detection System",
    description:
      "Real-time face and emotion detection built using YOLOv12 and Vision Transformers with optimized inference pipeline.",
    details: [
      "Built using YOLOv12 and Vision Transformers",
      "Real-time detection pipeline",
      "Preprocessing, augmentation, training, and inference",
      "Evaluated using precision, recall, IoU metrics",
      "Inference optimization for production deployment",
    ],
    tags: ["YOLOv12", "Vision Transformers", "Computer Vision", "Deep Learning"],
    github: "#",
  },
  {
    title: "Cancer Prediction Model",
    description:
      "Supervised ML model for cancer prediction with feature engineering, model evaluation, and optimization.",
    details: [
      "Supervised ML model built from scratch",
      "Feature engineering and selection pipeline",
      "Model evaluation and hyperparameter optimization",
      "Classification and performance analysis",
    ],
    tags: ["Scikit-learn", "Python", "ML", "Healthcare"],
    github: "#",
  },
]

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0]
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="glass-card group rounded-xl p-6 transition-all duration-300 hover:glow-blue">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
          aria-label={`GitHub link for ${project.title}`}
        >
          <ExternalLink className="size-4" />
        </a>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="border-primary/30 text-primary text-xs bg-primary/5"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
      >
        {expanded ? "Hide Details" : "View Details"}
        {expanded ? (
          <ChevronUp className="size-3" />
        ) : (
          <ChevronDown className="size-3" />
        )}
      </button>

      {expanded && (
        <ul className="mt-3 space-y-2 border-t border-border/30 pt-3">
          {project.details.map((detail) => (
            <li
              key={detail}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            End-to-end AI systems built with production-grade engineering
            practices.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
