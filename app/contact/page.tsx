import { PageShell } from "@/components/page-shell"

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Get in touch"
      title={
        <>
          Say <span className="text-primary/85">hello</span>
        </>
      }
      subtitle="Got a question or just want to chat? Drop a message."
    >
      <form className="mx-auto flex max-w-md flex-col gap-4 rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-md">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs uppercase tracking-wide text-muted-foreground">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs uppercase tracking-wide text-muted-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@email.com"
            className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-xs uppercase tracking-wide text-muted-foreground">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="What&apos;s on your mind?"
            className="resize-none rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50"
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-full border border-primary/50 bg-primary/25 px-6 py-3 text-sm text-primary transition-colors hover:bg-primary/40"
        >
          Send message
        </button>
      </form>
    </PageShell>
  )
}
