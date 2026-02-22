"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105",
          isOpen
            ? "bg-secondary text-foreground"
            : "bg-primary text-primary-foreground glow-blue"
        )}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? <X className="size-6" /> : <MessageSquare className="size-6" />}
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border/50 shadow-2xl sm:w-[420px]"
          style={{
            background: "oklch(0.12 0.02 260 / 0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/30 px-5 py-4">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/20">
              <Bot className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Portfolio Assistant</p>
              <p className="text-xs text-muted-foreground">Ask about Jagriti&apos;s profile</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 pt-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="size-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Hi! I&apos;m Jagriti&apos;s portfolio assistant.</p>
                <p className="text-xs text-muted-foreground max-w-[260px]">
                  Ask me about her skills, projects, experience, education, or certifications.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {["What are her skills?", "Tell me about her projects", "What is her experience?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        sendMessage({ text: q })
                      }}
                      className="rounded-full border border-border/50 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => {
              const text = getMessageText(message)
              if (!text) return null

              const isUser = message.role === "user"
              return (
                <div
                  key={message.id}
                  className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}
                >
                  <div
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full",
                      isUser ? "bg-primary/20" : "bg-accent/20"
                    )}
                  >
                    {isUser ? (
                      <User className="size-3.5 text-primary" />
                    ) : (
                      <Bot className="size-3.5 text-accent" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      isUser
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary/60 text-foreground rounded-tl-sm"
                    )}
                  >
                    {text}
                  </div>
                </div>
              )
            })}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <Bot className="size-3.5 text-accent" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-secondary/60 px-4 py-3">
                  <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-border/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Jagriti..."
                className="flex-1 rounded-xl border border-border/50 bg-secondary/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/80 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
