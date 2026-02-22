import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }
  return {
    title: `${post.title} | Jagriti Yadav`,
    description: post.description,
  }
}

function renderMarkdown(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeContent = ""
  let codeLanguage = ""
  let inTable = false
  let tableRows: string[][] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${i}`}
            className="my-4 overflow-x-auto rounded-lg bg-secondary/40 p-4 text-sm font-mono"
          >
            <code className="text-foreground/90">{codeContent.trim()}</code>
          </pre>
        )
        codeContent = ""
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLanguage = line.slice(3)
      }
      continue
    }

    if (inCodeBlock) {
      codeContent += line + "\n"
      continue
    }

    // Table detection
    if (line.includes("|") && line.trim().startsWith("|")) {
      if (!inTable) {
        inTable = true
        tableRows = []
      }
      const cells = line
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim())
      // Skip separator rows
      if (!cells.every((c) => c.match(/^[-:]+$/))) {
        tableRows.push(cells)
      }
      // Check if next line is not a table
      if (i + 1 >= lines.length || !lines[i + 1].includes("|")) {
        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {tableRows[0]?.map((h, idx) => (
                    <th
                      key={idx}
                      className="border border-border/30 bg-secondary/30 px-4 py-2 text-left text-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="border border-border/30 px-4 py-2 text-muted-foreground"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        inTable = false
        tableRows = []
      }
      continue
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="mt-10 mb-4 text-2xl font-bold text-foreground"
        >
          {line.slice(3)}
        </h2>
      )
      continue
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="mt-8 mb-3 text-xl font-semibold text-foreground"
        >
          {line.slice(4)}
        </h3>
      )
      continue
    }

    // Numbered list
    if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, "")
      elements.push(
        <li
          key={`ol-${i}`}
          className="ml-6 list-decimal text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: text
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              .replace(/`(.+?)`/g, '<code class="rounded bg-secondary/40 px-1.5 py-0.5 text-sm font-mono text-primary">$1</code>'),
          }}
        />
      )
      continue
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const text = line.slice(2)
      elements.push(
        <li
          key={`li-${i}`}
          className="ml-6 list-disc text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: text
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              .replace(/`(.+?)`/g, '<code class="rounded bg-secondary/40 px-1.5 py-0.5 text-sm font-mono text-primary">$1</code>'),
          }}
        />
      )
      continue
    }

    // Paragraph
    if (line.trim() !== "") {
      elements.push(
        <p
          key={`p-${i}`}
          className="my-3 text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              .replace(/`(.+?)`/g, '<code class="rounded bg-secondary/40 px-1.5 py-0.5 text-sm font-mono text-primary">$1</code>'),
          }}
        />
      )
    }
  }

  return elements
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.relatedSlugs)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 pt-28 pb-24">
        <article className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/30 text-primary text-xs bg-primary/5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {post.description}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {post.readingTime}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="prose-custom">{renderMarkdown(post.content)}</div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t border-border/30 pt-12">
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                Related Articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <div className="glass-card group rounded-xl p-5 transition-all duration-300 hover:glow-blue">
                      <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {related.readingTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  )
}
