import { PageShell } from "@/components/page-shell"

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title={
        <>
          A bit <span className="text-primary/85">about</span> this
        </>
      }
      subtitle="The story behind the Bandit Project."
    >
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card/40 p-8 leading-relaxed text-muted-foreground backdrop-blur-md">
        <p className="mb-4">
          The Bandit Project is a clean webpage build i&apos;ve been working on in my spare time. It started as a
          playground for interactive effects and slowly turned into something more.
        </p>
        <p className="mb-4">
          The goal is simple: keep it fast, keep it clean, and keep it fun. Everything here is hand-built and
          constantly evolving.
        </p>
        <p>More pages and features are on the way. Thanks for checking it out.</p>
      </div>
    </PageShell>
  )
}
