import { Award, Code, Trophy } from "lucide-react"

const certifications = [
  "McKinsey Forward Program",
  "Google Foundations of Project Management",
  "SQL (Advanced)",
  "Data Analytics Certifications",
  "Python Certification",
  "Cyber Security Simulation",
  "Introduction to Psychology — Yale",
  "International Conference on Computational Intelligence & Cyber Security",
]

const achievements = [
  { label: "3-Star in Python", icon: Code },
  { label: "3-Star in SQL", icon: Code },
  { label: "1500+ LeetCode Rating", icon: Trophy },
]

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Certifications &{" "}
            <span className="text-gradient">Achievements</span>
          </h2>
        </div>

        {/* Certifications grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <div
              key={cert}
              className="glass-card flex items-start gap-3 rounded-xl p-4 transition-all duration-300 hover:glow-blue"
            >
              <Award className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm text-foreground">{cert}</span>
            </div>
          ))}
        </div>

        {/* Coding Achievements */}
        <div className="mt-12">
          <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
            Coding Achievements
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {achievements.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="glass-card flex items-center gap-3 rounded-xl px-6 py-4 transition-all duration-300 hover:glow-violet"
              >
                <Icon className="size-5 text-accent" />
                <span className="font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
