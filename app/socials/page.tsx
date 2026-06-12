import { PageShell } from "@/components/page-shell"

const socials = [
  { name: "Twitter / X", handle: "@banditproject", href: "https://twitter.com" },
  { name: "GitHub", handle: "/banditproject", href: "https://github.com" },
  { name: "Discord", handle: "Bandit Community", href: "https://discord.com" },
  { name: "YouTube", handle: "Bandit Project", href: "https://youtube.com" },
]

export default function SocialsPage() {
  return (
    <PageShell
      eyebrow="Socials"
      title={
        <>
          Find me <span className="text-primary/85">online</span>
        </>
      }
      subtitle="Links to where i post and hang out."
    >
      <div className="mx-auto flex max-w-md flex-col gap-3">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-border bg-card/40 px-6 py-4 backdrop-blur-md transition-colors hover:border-primary/40"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground/90">{s.name}</span>
              <span className="text-xs text-muted-foreground">{s.handle}</span>
            </div>
            <span className="text-primary/70">→</span>
          </a>
        ))}
      </div>
    </PageShell>
  )
}
