"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock, ArrowLeft } from "lucide-react"
import { blogPosts, allTags } from "@/lib/blog-data"
import PageShell from "@/components/page-shell"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTag =
        selectedTag === null || post.tags.includes(selectedTag)
      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedTag])

  return (
    <PageShell>
      <div className="px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
          </div>
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-gradient">Blog</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Technical writing on AI systems, research explorations, and
              engineering insights.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="bg-secondary/30 border-border/50 pl-10 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  selectedTag === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          <div className="space-y-6">
            {filteredPosts.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">
                No articles match your search.
              </p>
            ) : (
              filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="glass-card group rounded-xl p-6 transition-all duration-300 hover:glow-blue">
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
                    <h2 className="mt-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readingTime}
                      </span>
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
