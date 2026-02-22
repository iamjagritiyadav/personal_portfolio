import { Briefcase, GraduationCap, Users, Cloud } from "lucide-react"

const experiences = [
  {
    title: "LLM Post-Training Intern",
    company: "Ethara AI",
    icon: Briefcase,
    items: [
      "Prompt writing & AI output evaluation",
      "Comparative review of generated images/videos",
      "Quality assessment & alignment analysis",
    ],
  },
  {
    title: "AI/ML Intern",
    company: "ANNAM.AI",
    icon: Briefcase,
    items: [
      "Fine-tuned computer vision models",
      "Built preprocessing & validation pipelines",
      "Improved inference performance",
    ],
  },
  {
    title: "Cyber Security Intern",
    company: "NIELIT",
    icon: Briefcase,
    items: [
      "Network security fundamentals",
      "Threat analysis & cyber defense practices",
      "System vulnerability protection exposure",
    ],
  },
  {
    title: "SWE Fellow",
    company: "Headstarter AI",
    icon: GraduationCap,
    items: [
      "Software engineering trainee",
      "Built applied technical projects",
    ],
  },
  {
    title: "Program Manager",
    company: "Samsung Innovation Campus",
    icon: Users,
    items: [
      "Coordinated coding & programming batch",
      "Managed curriculum delivery",
      "Supported students in programming foundations",
    ],
  },
  {
    title: "Campus Ambassador",
    company: "Yonder Wonder",
    icon: Users,
    items: [
      "Organized event with 200+ participants",
      "Drove 500+ signups",
    ],
  },
  {
    title: "Arcade Participant",
    company: "Google Cloud Skills Boost",
    icon: Cloud,
    items: [
      "Completed GCP hands-on labs",
      "Cloud deployment & resource management",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="text-gradient">Experience</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Professional and community contributions across AI, engineering, and
            leadership.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-border/50 md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon
              const isLeft = idx % 2 === 0

              return (
                <div
                  key={exp.title + exp.company}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Circle on timeline */}
                  <div className="absolute left-6 -translate-x-1/2 md:left-1/2 z-10">
                    <div className="flex size-10 items-center justify-center rounded-full border border-border/50 bg-secondary">
                      <Icon className="size-4 text-primary" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-4" : "md:pl-4"
                    }`}
                  >
                    <div className="glass-card rounded-xl p-5 transition-all duration-300 hover:glow-blue">
                      <h3 className="font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="mt-1 text-sm text-primary">{exp.company}</p>
                      <ul className="mt-3 space-y-1.5">
                        {exp.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
